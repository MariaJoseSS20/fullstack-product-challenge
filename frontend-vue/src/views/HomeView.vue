<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Gestión de Productos</h1>

      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div class="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" v-model="newProduct.name" placeholder="Nombre del producto"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>

          <div class="flex gap-4">
            <div class="w-1/2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
              <input type="text" v-model="newProduct.price" placeholder="Precio"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>

            <div class="w-1/2">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input type="number" v-model="newProduct.stock" placeholder="Stock"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1" required />
            </div>
          </div>
          <button type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Agregar Producto
          </button>
        </div>
      </form>

      <div class="bg-white rounded-lg shadow-sm max-w-4xl mx-auto">

        <div class="flex justify-between px-4 py-4 border-b border-gray-200 font-semibold text-gray-900 text-center">
          <div class="w-1/4">Producto</div>
          <div class="w-1/4">Precio</div>
          <div class="w-1/4">Stock</div>
          <div class="w-1/4">Acción</div>
        </div>

        <ul class="divide-y divide-gray-200">
          <li v-for="product in products" :key="product.id" class="p-6">
            <div class="flex justify-between items-center text-center">
              <div class="w-1/4 pr-4">
                {{ product.name }}
              </div>
              <div class="w-1/4">
                {{ formatPrice(product.price) }}
              </div>
              <div class="w-1/4">
                {{ product.stock }}
              </div>
              <div class="w-1/4 pl-4">
                <button @click="handleDelete(product.id)"
                  class="mt-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
      newProduct: {
        name: '',
        price: '',
        stock: ''
      }
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8000/api/products')
        this.products = response.data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    async handleSubmit() {
      try {
        const rawPrice = this.newProduct.price.trim()

        const validFormat = /^(\d{1,3})(\.\d{3})*$|^\d+$/;

        if (!validFormat.test(rawPrice)) {
          alert("El formato del precio no es válido. Usa solo números o separadores de miles con punto (ej: 20.000)");
          return;
        }

        const cleanPrice = parseInt(this.newProduct.price.replace(/\./g, ''));

        if (isNaN(cleanPrice) || cleanPrice < 0) {
          alert("El precio ingresado no es válido");
          return;
        }

        const existingProduct = this.products.find(
          (p) => p.name.trim().toLowerCase() === this.newProduct.name.trim().toLowerCase()
        );

        if (existingProduct) {
          const confirmUpdate = window.confirm(
            `Ya existe un producto llamado "${existingProduct.name}". ¿Deseas actualizarlo?`
          );

          if (!confirmUpdate) {
            return; // Cancelar si el usuario no quiere actualizar
          }

          // Actualizar el producto existente con PUT
          await axios.put(`http://localhost:8000/api/products/${existingProduct.id}`, {
            ...this.newProduct,
            price: cleanPrice
          });

        } else {
          // Crear nuevo producto si no existe
          await axios.post('http://localhost:8000/api/products', {
            ...this.newProduct,
            price: cleanPrice
          });
        }

        // Limpiar formulario y refrescar lista
        this.newProduct = { name: '', price: '', stock: '' };
        this.fetchProducts();

      } catch (error) {
        console.error('Error al guardar el producto:', error);
      }
    },

    async handleDelete(id) {
      try {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmDelete) {
          return; // Si el usuario cancela, no se hace nada
        }
        await axios.delete(`http://localhost:8000/api/products/${id}`)
        this.fetchProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    },
    formatPrice(value) {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    }

  },

  mounted() {
    this.fetchProducts()
  }
}
</script>

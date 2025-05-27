<template>
<div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestión de Productos</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Nombre del producto"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                id="price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="Precio"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Agregar Producto
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow-sm">
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Eliminar
                </button>
              </li>
            ))}
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

        // Permitir solo números como "20000", "20.000", "1.234.567"
        const validFormat = /^(\d{1,3})(\.\d{3})*$|^\d+$/

        if (!validFormat.test(rawPrice)) {
          alert("El formato del precio no es válido. Usa solo números o separadores de miles con punto (ej: 20.000)");
          return;
        }

        const cleanPrice = parseInt(this.newProduct.price.replace(/\./g, ''));

        if (isNaN(cleanPrice) || cleanPrice < 0) {
          alert("El precio ingresado no es válido");
          return;
        }
        await axios.post('http://localhost:8000/api/products', this.newProduct)
        this.newProduct = { name: '', price: '', stock: '' }
        this.fetchProducts()
      } catch (error) {
        console.error('Error creating product:', error)
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

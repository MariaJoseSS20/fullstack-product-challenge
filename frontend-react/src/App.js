import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  const rawPrice = newProduct.price.trim();
  const validFormat = /^(\d{1,3})(\.\d{3})*$|^\d+$/;

  if (!validFormat.test(rawPrice)) {
    alert('Formato de precio inválido (ej: 20.000)');
    return;
  }

  const cleanPrice = parseInt(newProduct.price.replace(/\./g, ''));
  if (isNaN(cleanPrice) || cleanPrice < 0) {
    alert('El precio ingresado no es válido');
    return;
  }

  try {
    // Buscar si ya existe un producto con el mismo nombre (ignorando mayúsculas y espacios)
    const existingProduct = products.find(
      (p) => p.name.trim().toLowerCase() === newProduct.name.trim().toLowerCase()
    );

    if (existingProduct) {
      const confirmUpdate = window.confirm(
        `Ya existe un producto llamado "${existingProduct.name}". ¿Deseas actualizarlo?`
      );

      if (!confirmUpdate) return;

      // Actualizar el producto existente con PUT
      await axios.put(`http://localhost:8000/api/products/${existingProduct.id}`, {
        ...newProduct,
        price: cleanPrice
      });
    } else {
      // Crear nuevo producto
      await axios.post('http://localhost:8000/api/products', {
        ...newProduct,
        price: cleanPrice
      });
    }

    setNewProduct({ name: '', price: '', stock: '' });
    fetchProducts();
  } catch (error) {
    console.error('Error guardando producto:', error);
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  const formatPrice = (value) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestión de Productos</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-2/3">
                <label className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Agregar Producto
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow-sm max-w-4xl mx-auto">
          <div className="flex justify-between px-4 py-4 border-b border-gray-200 font-semibold text-gray-900 text-center">
            <div className="w-1/4">Producto</div>
            <div className="w-1/4">Precio</div>
            <div className="w-1/4">Stock</div>
            <div className="w-1/4">Acción</div>
          </div>

          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id} className="p-6">
                <div className="flex justify-between items-center text-center">
                  <div className="w-1/4 pr-4">{product.name}</div>
                  <div className="w-1/4">{formatPrice(product.price)}</div>
                  <div className="w-1/4">{product.stock}</div>
                  <div className="w-1/4 pl-4">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="mt-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

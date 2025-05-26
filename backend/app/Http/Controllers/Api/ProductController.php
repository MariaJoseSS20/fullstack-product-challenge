<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Product::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required',
            'stock' => 'required|integer|min:1'
        ]);

        // Limpia el precio: quita puntos y convierte a número
        $cleanedPrice = (int) str_replace('.', '', $validated['price']);

        if ($cleanedPrice <= 0) {
            return response()->json(['error' => 'El precio debe ser mayor que 0'], 422);
        }

        $product = Product::create([
            'name' => $validated['name'],
            'price' => $cleanedPrice,
            'stock' => $validated['stock'],
        ]);

        return response()->json($product, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}

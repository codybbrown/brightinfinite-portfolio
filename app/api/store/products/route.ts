import { NextResponse } from "next/server";
import {
  getProducts,
  getProductById,
} from "../../../../lib/services/store.api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const product = await getProductById(id);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }

    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error in store products API:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

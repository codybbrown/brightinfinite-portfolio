import { NextResponse } from "next/server";
import { createCart, addToCart } from "../../../../lib/services/store.api";
import { Cart, CartItem } from "../../../../types/store.types";

export async function POST(request: Request) {
  try {
    const cart = await createCart();
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error in cart API:", error);
    return NextResponse.json(
      { error: "Failed to create cart" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { cart, productId, quantity } = (await request.json()) as {
      cart: Cart;
      productId: string;
      quantity: number;
    };

    const updatedCart = await addToCart(cart, productId, quantity);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("Error in cart API:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

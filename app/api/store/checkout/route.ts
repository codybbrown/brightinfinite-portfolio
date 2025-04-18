import { NextResponse } from "next/server";
import { createOrder } from "../../../../lib/services/store.api";
import { Cart, Order } from "../../../../types/store.types";

export async function POST(request: Request) {
  try {
    const { cart, customerInfo } = (await request.json()) as {
      cart: Cart;
      customerInfo: Order["customerInfo"];
    };

    const order = await createOrder(cart, customerInfo);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error in checkout API:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

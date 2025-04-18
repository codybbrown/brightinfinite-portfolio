import { sanityClient } from "../sanity/client";
import { productQuery } from "../sanity/queries";
import { Product, Cart, CartItem, Order } from "../../types/store.types";
import { validateQuantity, validatePrice } from "../utils/validation";

export async function getProducts(): Promise<Product[]> {
  return await sanityClient.fetch(productQuery);
}

export async function getProductById(id: string): Promise<Product | null> {
  const query = `*[_type == "product" && _id == $id][0] {
    "id": _id,
    name,
    price,
    description,
    "images": images[] {
      "url": asset->url,
      "alt": alt
    },
    category,
    stock,
    metadata
  }`;

  return await sanityClient.fetch(query, { id });
}

export async function createCart(): Promise<Cart> {
  const cart: Cart = {
    id: crypto.randomUUID(),
    items: [],
    total: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return cart;
}

export async function addToCart(
  cart: Cart,
  productId: string,
  quantity: number
): Promise<Cart> {
  if (!validateQuantity(quantity)) {
    throw new Error("Invalid quantity");
  }

  const product = await getProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (!validatePrice(product.price)) {
    throw new Error("Invalid product price");
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId === productId
  );

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
      price: product.price,
    });
  }

  cart.total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  cart.updatedAt = new Date().toISOString();

  return cart;
}

export async function createOrder(
  cart: Cart,
  customerInfo: Order["customerInfo"]
): Promise<Order> {
  const order: Order = {
    id: crypto.randomUUID(),
    items: cart.items,
    total: cart.total,
    status: "pending",
    customerInfo,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return order;
}

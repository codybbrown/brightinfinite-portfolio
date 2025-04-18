import { getProducts } from "@/lib/services/store.api";
import ProductCard from "@/components/modules/store/ProductCard";
import { notFound } from "next/navigation";

export default async function StorePage() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

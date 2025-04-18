import Image from "next/image";
import { Product } from "../../../types/store.types";
import { Button } from "@/components/ui/button";
import { formatPrice } from "../../../lib/utils/formatting";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="group relative bg-card rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">
            {formatPrice(product.price)}
          </span>

          {onAddToCart && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddToCart(product.id)}
            >
              Add to Cart
            </Button>
          )}
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-sm text-amber-600 mt-2">
            Only {product.stock} left in stock!
          </p>
        )}

        {product.stock === 0 && (
          <p className="text-sm text-destructive mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
}

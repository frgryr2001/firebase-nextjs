import { Product } from "@/types/product";
import ProductCard from "../product-card";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="mt-10 flex flex-wrap  justify-center gap-4 ">
      {products ? (
        products.map((product) => (
          <>
            <ProductCard key={product.id} product={product} />
          </>
        ))
      ) : (
        <p>Not found product</p>
      )}
    </div>
  );
}

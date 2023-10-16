import Container from "@/components/container";
import ProductFilter from "@/components/product-filter";

export default function Home() {
  return (
    <main className="mt-10">
      <Container className="px-4 md:px-2">
        <h1 className=" text-3xl font-bold md:text-4xl">All Products</h1>
        <ProductFilter />
      </Container>
    </main>
  );
}

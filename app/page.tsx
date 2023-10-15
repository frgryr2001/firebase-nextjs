import Container from "@/components/container";
import ProductFilter from "@/components/product-filter";

export default function Home() {
  return (
    <main className=" mt-10">
      <Container>
        <h1 className="text-center text-4xl font-bold">All Product</h1>
        <ProductFilter />
      </Container>
    </main>
  );
}

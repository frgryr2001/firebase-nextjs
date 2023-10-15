import Container from "@/components/container";
import { CreateProductForm } from "@/components/product-form";

export default function Product() {
  return (
    <div className="mt-10">
      <Container>
        <div className="mx-auto w-1/2">
          <CreateProductForm />
        </div>
      </Container>
    </div>
  );
}

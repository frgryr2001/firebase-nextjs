import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="w-[300px]">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src={product?.image}
                alt={product?.description}
                fill
                priority
                sizes="300px"
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </CardTitle>
        <CardDescription>{product?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{product?.name}</p>
      </CardContent>
      <CardFooter>
        <p>{product?.price}</p>
      </CardFooter>
    </Card>
  );
}

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
    <Card className="transition-transform hover:scale-105">
      <CardHeader>
        <CardTitle>
          <div className="w-[300px] sm:w-[230px]  md:w-[220px]">
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
        <h3 className="text-xl font-medium uppercase">{product?.name}</h3>
      </CardContent>
      <CardFooter>
        <p>{product?.price}</p>
      </CardFooter>
    </Card>
  );
}

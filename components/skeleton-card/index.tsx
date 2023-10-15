import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "../ui/aspect-ratio";
export default function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="w-[300px]">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Skeleton className="rounded-md object-cover" />
            </AspectRatio>
          </div>
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-1/2" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-1/2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="w-1/2" />
      </CardFooter>
    </Card>
  );
}

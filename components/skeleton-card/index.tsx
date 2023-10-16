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
              <Skeleton className="h-full w-[300px] rounded-md object-cover" />
            </AspectRatio>
          </div>
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-full" />
      </CardFooter>
    </Card>
  );
}

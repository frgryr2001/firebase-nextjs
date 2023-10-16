import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchInput from "../search-input";
export default function DiaLog({
  elementTrigger,
}: {
  elementTrigger: React.ReactElement;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        {elementTrigger || <button className="w-full">Open Dialog</button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* <DialogTitle>Search</DialogTitle> */}
          <DialogDescription className="text-center">
            <div className="">
              <SearchInput
                hasButton
                className="flex w-full justify-center gap-1"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

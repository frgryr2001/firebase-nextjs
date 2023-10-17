import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchInput from "../search-input";
import { useState } from "react";
export default function DiaLog({
  elementTrigger,
}: {
  elementTrigger: React.ReactElement;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangeDialog = (value: boolean) => {
    setOpenDialog(value);
  };
  return (
    <Dialog
      open={openDialog}
      onOpenChange={(value) => handleChangeDialog(value)}
    >
      <DialogTrigger>
        <div>
          {elementTrigger || <button className="w-full">Open Dialog</button>}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* <DialogTitle>Search</DialogTitle> */}
          <DialogDescription className="text-center">
            <div className="mt-4">
              <SearchInput
                hasButton
                className="flex w-full justify-center gap-1"
                onCLoseDialog={() => {
                  setOpenDialog(false);
                }}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

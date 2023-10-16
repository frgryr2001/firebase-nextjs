import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function SearchInput({
  className,
  hasButton,
  isMobile,
}: {
  className?: string;
  hasButton?: boolean;
  isMobile?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [search, setSearch] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleSearch = (value: string) => {
    router.push(pathname + "?" + createQueryString("search", value));
  };

  const handleClickSearch = () => {
    if (isMobile) {
      setOpenDialog(true);
    }
  };

  return (
    <div className={className}>
      <Input
        placeholder="Search"
        className="w-[300px]"
        type="search"
        // onClick={handleClickSearch}
        onFocus={() => {
          handleClickSearch();
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {hasButton && (
        <Button variant="outline" onClick={() => handleSearch(search)}>
          <AiOutlineSearch />
        </Button>
      )}
    </div>
  );
}

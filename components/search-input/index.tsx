import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [search, setSearch] = useState<string>("");

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

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search"
        className="w-[300px]"
        type="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Button variant="outline" onClick={() => handleSearch(search)}>
        <AiOutlineSearch />
      </Button>
    </div>
  );
}

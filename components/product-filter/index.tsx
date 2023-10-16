"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductList from "../product-list";
import { getProducts } from "@/config/firebase";
import { Product } from "@/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchInput from "../search-input";

export default function ProductFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProductsFromDatabase = async () => {
      const data = await getProducts();
      setProducts(data as any);
    };

    getProductsFromDatabase();
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const sort = searchParams.get("sort") || "price-desc";
  const search = searchParams.get("search") || "";

  const handleSort = (value: string) => {
    if (value === "price-desc") {
      router.push(pathname + "?" + createQueryString("sort", "price-desc"));
    }
    if (value === "price-asc") {
      router.push(pathname + "?" + createQueryString("sort", "price-asc"));
    }
  };

  const dataSorted = useMemo(() => {
    if (sort === "price-desc") {
      return [...products].sort((a, b) => +b.price - +a.price);
    }
    if (sort === "price-asc") {
      return [...products].sort((a, b) => +a.price - +b.price);
    }
    return products;
  }, [sort, products]);

  const dataSearched = useMemo(() => {
    if (search) {
      return dataSorted.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return dataSorted;
  }, [search, dataSorted]);

  return (
    <>
      {/* Filter */}
      <div className="mt-4 flex gap-5 ">
        <Select onValueChange={handleSort}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-desc">
              Sort by Price (high first)
            </SelectItem>
            <SelectItem value="price-asc">Sort by Price (low first)</SelectItem>
          </SelectContent>
        </Select>
        <SearchInput className="hidden gap-2 sm:flex" hasButton />
      </div>

      <ProductList products={dataSearched} />
    </>
  );
}

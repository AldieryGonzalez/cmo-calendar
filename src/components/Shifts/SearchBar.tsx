import React from "react";
import { Input, InputProps } from "../ui/input";
import { SearchIcon, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { DatePickerWithRange } from "../DateRangePicker";
import { DateRange } from "react-day-picker";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SetURLSearchParams } from "react-router-dom";
import { getDateRangeFromSearchParams } from "@/utilities/dateUtils";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

interface SearchBarProps extends InputProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, searchParams, setSearchParams, ...props }, ref) => {
    const dateRange = getDateRangeFromSearchParams(searchParams);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("search", e.target.value);
      setSearchParams(newSearchParams);
    };
    const handleWhereChange = (value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("where", value);
      setSearchParams(newSearchParams);
    };
    const handleDateChange = (dateRange: DateRange | undefined) => {
      if (dateRange) {
        const newSearchParams = new URLSearchParams(searchParams);
        if (dateRange.from) {
          newSearchParams.set("start", dateRange.from.toISOString());
        }
        if (dateRange.to) {
          newSearchParams.set("end", dateRange.to.toISOString());
        }
        setSearchParams(newSearchParams);
      }
    };
    return (
      <div
        className={cn(
          "flex h-10 w-full items-center rounded-md border border-input bg-white px-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          className,
        )}
      >
        <SearchIcon className="h-[16px] w-[16px]" />
        <input
          {...props}
          type="search"
          ref={ref}
          onChange={handleSearchChange}
          value={searchParams.get("search") || undefined}
          placeholder="Search for an ensemble, musician, date or role"
          className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Sheet>
          <SheetTrigger>
            <SlidersHorizontal className="w-4" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-2">
              <SheetTitle>Advanced Search</SheetTitle>
            </SheetHeader>
            <Label>Search</Label>
            <Input
              onChange={handleSearchChange}
              value={searchParams.get("search") || undefined}
              placeholder="Search for an ensemble, musician, date or role"
              className="mb-2"
            />
            <Label>Where</Label>
            <Select
              onValueChange={handleWhereChange}
              value={searchParams.get("where") || undefined}
            >
              <SelectTrigger className="mb-2">
                <SelectValue placeholder="Select a hall" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="galvin">Galvin</SelectItem>
                <SelectItem value="mcclintock">McClintock</SelectItem>
                <SelectItem value="pick">Pick</SelectItem>
                <SelectItem value="mcr">MCR</SelectItem>
              </SelectContent>
            </Select>
            <Label>Date Range</Label>
            <DatePickerWithRange
              date={dateRange}
              handleDateChange={handleDateChange}
              className="mb-2"
            />
          </SheetContent>
        </Sheet>
      </div>
    );
  },
);

SearchBar.displayName = "Search";

export default SearchBar;

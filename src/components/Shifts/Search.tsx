import React from "react";
import { InputProps } from "../ui/input";
import { SearchIcon, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { DatePickerWithRange } from "../DateRangePicker";
import { DateRange } from "react-day-picker";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

interface SearchBarProps extends InputProps {
	date: DateRange | undefined;
	handleDateChange: (dateRange: DateRange | undefined) => void;
}

const Search = React.forwardRef<HTMLInputElement, SearchBarProps>(
	({ className, date, handleDateChange, ...props }, ref) => {
		return (
			<div
				className={cn(
					"flex h-10 w-full items-center rounded-md border border-input bg-white px-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
					className
				)}>
				<SearchIcon className='h-[16px] w-[16px]' />
				<input
					{...props}
					type='search'
					ref={ref}
					className='w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
				/>
				<Sheet>
					<SheetTrigger>
						<SlidersHorizontal className='w-4' />
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>
								Are you sure absolutely sure?
							</SheetTitle>
							<SheetDescription>
								This action cannot be undone. This will
								permanently delete your account and remove your
								data from our servers.
							</SheetDescription>
						</SheetHeader>
						<DatePickerWithRange
							date={date}
							handleDateChange={handleDateChange}
						/>
					</SheetContent>
				</Sheet>
			</div>
		);
	}
);

Search.displayName = "Search";

export default Search;

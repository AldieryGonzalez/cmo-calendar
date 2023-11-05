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

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

interface SearchBarProps extends InputProps {
	date: DateRange | undefined;
	handleDateChange: (dateRange: DateRange | undefined) => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
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
						<SheetHeader className='mb-2'>
							<SheetTitle>Advanced Search</SheetTitle>
						</SheetHeader>
						<Label>Search</Label>
						<Input className='mb-2' />
						<Label>Where</Label>
						<Select>
							<SelectTrigger className='mb-2'>
								<SelectValue placeholder='Select a hall' />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value='m@example.com'>
									m@example.com
								</SelectItem>
								<SelectItem value='m@google.com'>
									m@google.com
								</SelectItem>
								<SelectItem value='m@support.com'>
									m@support.com
								</SelectItem>
							</SelectContent>
						</Select>
						<Label>Date Range</Label>
						<DatePickerWithRange
							date={date}
							handleDateChange={handleDateChange}
							className='mb-2'
						/>
					</SheetContent>
				</Sheet>
			</div>
		);
	}
);

SearchBar.displayName = "Search";

export default SearchBar;

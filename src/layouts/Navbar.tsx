import React, { useState } from "react";
import cn from "classnames";
import { googleSignIn, signOut } from "@/utilities/supabase";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useAuth } from "@/utilities/useAuth";
import type { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

type AuthComponent = {
	user: Session | null;
	noUser?: boolean;
};

type StrictAuthComponent = {
	user: Session;
};

const SignInButton = () => {
	return (
		<button
			onClick={googleSignIn}
			className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple-900 hover:bg-white mt-4 lg:mt-0'>
			Sign In
		</button>
	);
};

const ProfileButton: React.FC<StrictAuthComponent> = ({ user }) => {
	const { picture, name } = user.user.user_metadata;
	const navigate = useNavigate();
	const section1 = [
		{ text: "Profile", path: "/home" },
		{ text: "Settings", path: "/#" },
	];
	return (
		<>
			<div className='hidden lg:block'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className='flex items-center text-sm font-medium text-white rounded-full p-1 hover:underline focus:ring-1 focus:ring-gray-100'>
							<img
								className='w-8 h-8 mr-2 rounded-full'
								src={picture}
								alt='user photo'
							/>
							{name}
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56'>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{section1.map((item) => {
								return (
									<DropdownMenuItem
										key={item.text}
										onClick={() => navigate(item.path)}>
										{item.text}
									</DropdownMenuItem>
								);
							})}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />

						<DropdownMenuItem onClick={signOut}>
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='block lg:hidden'>
				<hr></hr>
				{section1.map((item) => {
					return (
						<Link
							to={item.path}
							key={item.text}
							className='block my-3 lg:inline-block text-white hover:underline mr-4'>
							{item.text}
						</Link>
					);
				})}
				<hr></hr>
				<button
					onClick={signOut}
					className='block mt-4 lg:inline-block text-white font-bold hover:underline mr-4'>
					Log out
				</button>
			</div>
		</>
	);
};

const AuthButton: React.FC<AuthComponent> = ({ user }) => {
	return user !== null ? <ProfileButton user={user} /> : <SignInButton />;
};

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const { session } = useAuth();

	const handleOpen = () => {
		setOpen((prev) => !prev);
	};
	return (
		<nav className='flex items-center justify-between flex-wrap bg-purple-900 p-6'>
			<div className='flex items-center flex-shrink-0 text-white mr-6'>
				<svg
					className='fill-current h-8 w-8 mr-2'
					width='54'
					height='54'
					viewBox='0 0 54 54'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z' />
				</svg>
				<span className='font-semibold text-xl tracking-tight'>
					CMO Scheduler
				</span>
			</div>
			<div
				className={cn({
					"block lg:hidden": !!session,
					hidden: !session,
				})}>
				<button
					className='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'
					onClick={handleOpen}>
					<svg
						className='fill-current h-3 w-3'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<title>Menu</title>
						<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
					</svg>
				</button>
			</div>
			<div
				className={cn(
					"w-full block transition-all duration-300 flex-grow lg:flex lg:items-center lg:w-auto",
					{
						"max-h-0": open,
						"max-h-96": !open,
					}
				)}>
				<div
					className={cn("transition-all text-md lg:flex-grow", {
						"opacity-0": open,
						"hidden lg:invisible lg:block": !session,
					})}>
					<Link
						to='home'
						className='block mt-4 lg:inline-block lg:mt-0 text-white hover:underline mr-4'>
						Home
					</Link>
					<Link
						to='calendar'
						className='block mt-4 lg:inline-block lg:mt-0 text-white hover:underline mr-4'>
						Calendar
					</Link>
					<Link
						to='requests'
						className='block mt-4 lg:inline-block lg:mt-0 text-white hover:underline'>
						Shift Sub Requests
					</Link>
				</div>
				<div
					className={cn("transition-all text-md ", {
						"opacity-0": open,
						"mt-2": !open,
						"hidden lg:invisible lg:block": !session,
					})}>
					<AuthButton user={session} />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

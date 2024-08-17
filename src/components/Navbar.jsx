import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
    const {user, handleSignOut} = useContext(AuthContext)
	const navLinks = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "Add Product",
			path: "/addproduct",
		},
	];
	return (
		<div className="navbar sticky top-0 z-10 bg-base-100 text-slate-900">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
					>
						{navLinks.map((navLink,idx) => (
							<Link key={idx} className="btn btn-ghost" to={navLink.path}>
								{navLink.name}
							</Link>
						))}
					</ul>
				</div>
				<div className="btn w-fit h-fit btn-ghost">
					<Link href={"/"}>Easy-Shopping</Link>
				</div>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					{navLinks.map((navLink, idx) => (
						<Link key={idx} className="btn btn-ghost" to={navLink.path}>
							{navLink.name}
						</Link>
					))}
				</ul>
			</div>
			<div className="navbar-end flex gap-4">
				{user ? (
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="avatar btn btn-circle tooltip z-50 tooltip-left"
							data-tip={`${user?.displayName}`}
						>
							<div className="w-10 rounded-full">
								<img alt="User Image" src={user?.photoURL} />
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52 relative"
						>
							<li>
								<button
									onClick={handleSignOut}
									className="text-gray-800 transition-colors duration-300 relative group hover:bg-red-700 hover:text-white"
								>
									Logout
								</button>
							</li>
						</ul>
					</div>
				) : (
					<Link className="btn btn-outline btn-success" to="/login">
						Login
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
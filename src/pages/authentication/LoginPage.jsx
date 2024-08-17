import { Link, useNavigate} from "react-router-dom";
import { useContext, useState } from "react";

import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {AuthContext} from "../../providers/AuthProvider";


const LoginPage = () => {
	const { googleSignIn, signInUser, setIsLoading } = useContext(AuthContext);
	const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleGoogleSignIn = () => {
		googleSignIn()
			.then((result) => {
				// const token = credential.accessToken;
				const user = result.user;
				
				setIsLoading(false);
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `Hi ${user.displayName}! You are logged in.`,
					showConfirmButton: false,
					timer: 1500,
				});
                navigate("/products")
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage, errorCode);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong!",
					footer: `This happened because ${errorMessage}`,
				});
			});
	};

	const handleSignIn = (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		signInUser(email, password)
			.then((result) => {
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `You are successfully logged in.`,
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.catch((error) => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Failed to Sign in",
					footer: `This happened because ${error.message}`,
				});
			});
	};
	return (
		<>

			<div className="flex flex-col lg:flex-row items-center justify-between px-20 ">
				<div
					className="w-full my-4 mx-auto max-w-md p-4 border border-green-500 rounded-md shadow sm:p-8
			dark:bg-green-50 dark:text-green-800"
				>
					<h2 className="mb-3 text-3xl font-semibold text-center">
						Login to your account
					</h2>
					<p className="text-sm text-center dark:text-gray-600">
						Dont have account?
						<Link
							to="/register"
							className="focus:underline hover:underline"
						>
							Sign up here
						</Link>
					</p>
					<div className="my-6 space-y-4 border border-green-200">
						<button
							onClick={handleGoogleSignIn}
							aria-label="Login with Google"
							type="button"
							className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								className="w-5 h-5 fill-current"
							>
								<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
							</svg>
							<p>Login with Google</p>
						</button>
					</div>
					<div className="flex items-center w-full my-4">
						<hr className="w-full dark:text-gray-600" />
						<p className="px-3 dark:text-gray-600">OR</p>
						<hr className="w-full dark:text-gray-600" />
					</div>
					<form onSubmit={handleSignIn} className="space-y-8">
						<div className="space-y-4">
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="block text-sm"
								>
									Email address
								</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="leroy@jenkins.com"
									className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
								/>
							</div>
							<div className="space-y-2">
								<div className="flex justify-between">
									<label
										htmlFor="password"
										className="text-sm"
									>
										Password
									</label>
									<a
										rel="noopener noreferrer"
										href="#"
										className="text-xs hover:underline dark:text-gray-600"
									>
										Forgot password?
									</a>
								</div>
								<div className="relative">
									<input
										type={
											showPassword ? "text" : "password"
										}
										name="password"
										id="password"
										placeholder="*****"
										className="w-full px-3 py-2 border rounded-md border-green-300 text-gray-800 focus:border-green-800"
									/>
									<div
										onClick={handleShowPassword}
										className="absolute bottom-3 right-4"
									>
										{showPassword ? (
											<FaEye />
										) : (
											<FaEyeSlash />
										)}
									</div>
								</div>
							</div>
						</div>
						<div>
							<input
								type="submit"
								className="w-full btn px-8 py-3 font-semibold rounded-md"
								value="Sign in"
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default LoginPage;

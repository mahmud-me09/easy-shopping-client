import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "./ProductCard";
import { FaSearch } from "react-icons/fa";

const ProductPage = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const [price, setPrice] = useState(parseInt(localStorage.getItem("price")) || 1200);
	const [category, setCategory] = useState(
		localStorage.getItem("category") || ""
	);
	const [brand, setBrand] = useState(localStorage.getItem("brand") || "");
	const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy") || "");
	const [searchQuery, setSearchQuery] = useState("");
	const axiosPublic = useAxiosPublic();

	// Fetch total product count based on filters
	const { data: totalData, error: totalDataError } = useQuery({
		queryKey: ["totalData", price, category, brand, sortBy, searchQuery],
		queryFn: async () => {
			try {
				const params = new URLSearchParams({
					price_lte: price,
					category: category || "",
					brand: brand || "",
					sort: sortBy || "",
					search: searchQuery || "",
				});
				const result = await axiosPublic.get(
					`/totalproducts?${params.toString()}`
				);
				return result.data;
			} catch (totalDataError) {
				console.error("Error fetching total data:", totalDataError);
				throw totalDataError;
			}
		},
	});
// pagination calculation
	const count = totalData?.count || 0;
	const itemsPerPage = 6;
	const numberOfPages = Math.ceil(count / itemsPerPage);
	const pages = [...Array(numberOfPages).keys()];


	const {
		status,
		data: products,
		error,
	} = useQuery({
		queryKey: [
			"products",
			currentPage,
			itemsPerPage,
			price,
			category,
			brand,
			sortBy,
			searchQuery,
		],
		queryFn: async () => {
			try {
				const params = new URLSearchParams({
					page: currentPage,
					limit: itemsPerPage,
					price_lte: price,
					category: category || "",
					brand: brand || "",
					sort: sortBy || "",
					search: searchQuery || "",
				});
				const result = await axiosPublic.get(
					`/products?${params.toString()}`
				);
				return result.data;
			} catch (error) {
				console.error("Error fetching products:", error);
				throw error;
			}
		},
	});

	if (status === "loading") {
		return <span>Loading...</span>;
	}

	if (status === "error") {
		return <span>Error: {error.message}</span>;
	}

	return (
		<>
			<div className="mt-2 flex justify-center items-center">
				<div className="w-1/3 ">
					<form
						className="flex justify-center gap-2"
						onSubmit={(e) => {
							e.preventDefault();
							setSearchQuery(e.target.search.value);
							setCurrentPage(0);
						}}
					>
						<input
							className="p-3 border rounded-l-lg mb-4 w-full"
							type="text"
							name="search"
							placeholder={`Search the car name`}
							defaultValue={searchQuery}
						/>
						<button type="submit" className="btn">
							<FaSearch /> Search
						</button>
					</form>
				</div>
			</div>
			<div className="flex gap-4 flex-col justify-center lg:flex-row">
				<div>
					<label>
						Product Price:
						<input
							type="range"
							min={0}
							max={1200}
							value={price}
							className="range"
							step={300}
							onChange={(event) => {
								setPrice(event.target.value);
								localStorage.setItem(
									"price",
									event.target.value
								);
								setCurrentPage(0);
							}}
						/>
						<div className="flex w-full justify-between px-2 text-xs">
							<span>0K |</span>
							<span>300K |</span>
							<span>600K |</span>
							<span>900K |</span>
							<span>1.2M |</span>
						</div>
						<p>Range: 0-${price}K</p>
					</label>
				</div>

				{/* Category Filter */}
				<div>
					<label>
						Product Category:
						<select
							className="p-2 border rounded-lg block mb-4 w-full"
							name="category"
							value={category}
							onChange={(event) => {
								setCategory(event.target.value);
								localStorage.setItem(
									"category",
									event.target.value
								);
								setCurrentPage(0);
							}}
						>
							<option value=""></option>
							<option value="Convertible">Convertible</option>
							<option value="Coupe">Coupe</option>
							<option value="Crossover">Crossover</option>
							<option value="Grand Tourer">
								Grand Tourer (GT)
							</option>
							<option value="Hatchback">Hatchback</option>
							<option value="Luxury SUV">Luxury SUV</option>
							<option value="Sportscar">Sportscar</option>
							<option value="RoadSter">RoadSter</option>
							<option value="SUV">SUV</option>
							<option value="Sedan">Sedan</option>
						</select>
					</label>
				</div>

				{/* Brand Filter */}
				<div>
					<label>
						Product Brand:
						<select
							className="p-2 border rounded-lg block mb-4 w-full"
							name="brand"
							value={brand}
							onChange={(event) => {
								setBrand(event.target.value);
								localStorage.setItem(
									"brand",
									event.target.value
								);
								setCurrentPage(0)
							}}
						>
							<option value=""></option>
							<option value="Aston Martin">Aston Martin</option>
							<option value="Audi">Audi</option>
							<option value="Bentley">Bentley</option>
							<option value="BMW">BMW</option>
							<option value="Chevrolet">Chevrolet</option>
							<option value="Ferrari">Ferrari</option>
							<option value="Ford">Ford</option>
							<option value="Genesis">Genesis</option>
							<option value="Infiniti">Infiniti</option>
							<option value="Jaguar">Jaguar</option>
							<option value="Lamborghini">Lamborghini</option>
							<option value="Land Rover">Land Rover</option>
							<option value="Lexus">Lexus</option>
							<option value="Maserati">Maserati</option>
							<option value="McLaren">McLaren</option>
							<option value="Mercedes-Benz">Mercedes-Benz</option>
							<option value="Nissan">Nissan</option>
							<option value="Porsche">Porsche</option>
							<option value="Rolls-Royce">Rolls-Royce</option>
							<option value="Tesla">Tesla</option>
							<option value="Volkswagen">Volkswagen</option>
							<option value="Volvo">Volvo</option>
						</select>
					</label>
				</div>

				{/* Sort By */}
				<div className="flex">
					<label>
						Sort By:
						<select
							name="sortBy"
							className="p-2 border rounded-lg block mb-4 w-full"
							value={sortBy}
							onChange={(event) => {
								setSortBy(event.target.value);
								localStorage.setItem(
									"sortBy",
									event.target.value
								)
								setCurrentPage(0);
							}}
						>
							<option value=""></option>
							<option value="priceAsc">Price Ascending</option>
							<option value="priceDsc">Price Descending</option>
							<option value="createdAt">Date Added</option>
						</select>
					</label>
				</div>
			</div>

			<div className="grid grid-col-1 mt-5 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{products?.map((product, idx) => (
					<ProductCard key={idx} product={product} />
				))}
			</div>

			{/* Pagination */}
			<div className="flex justify-center p-5">
				<div className="join">
					<button
						className="join-item btn btn-square"
						name="previous"
						onClick={() =>
							setCurrentPage((prev) => Math.max(prev - 1, 0))
						}
					>
						{"<"}
					</button>
					{pages.map((page) => (
						<button
							onClick={() => setCurrentPage(page)}
							className={`btn btn-square ${
								currentPage === page ? "btn-warning" : ""
							}`}
							key={page}
						>
							{page + 1} {/* Show page numbers starting from 1 */}
						</button>
					))}
					<button
						className="join-item btn btn-square"
						name="next"
						onClick={() =>
							setCurrentPage((prev) =>
								Math.min(prev + 1, numberOfPages - 1)
							)
						}
					>
						{">"}
					</button>
				</div>
			</div>
		</>
	);
};

export default ProductPage;

import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const axiosPublic = useAxiosPublic();

const AddProductPage = () => {
	const [image, setImage] = useState("");

	const mutation = useMutation({
		mutationFn: async (data) => {
			const response = await axiosPublic.post("/product", data);
			return response.data;
		},
		onSuccess: (data) => {
			console.log("Success:", data);
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Product has been added",
				showConfirmButton: false,
				timer: 1000,
			});
		},
		onError: (error) => {
			console.error("Error:", error);
		},
	});

	const imgbbUpload = async (file) => {
		const apiKey = import.meta.env.VITE_IMGBB_API;

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await fetch(
				"https://api.imgbb.com/1/upload?key=" + apiKey,
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error uploading image:", error);
			throw error;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.target;
		const file = form.img.files[0];

		if (!file) {
			console.error("No file selected");
			return;
		}

		try {
			const uploadResponse = await imgbbUpload(file);
			const imageUrl = uploadResponse.data.display_url;

			const product = {
				name: form.name.value,
				price: form.price.value,
				category: form.category.value,
				description: form.description.value,
				rating: form.rating.value,
				brand:form.brand.value,
				image: imageUrl,
				createdAt: new Date().toISOString(),
			};

			mutation.mutate(product);
			form.reset();
		} catch (error) {
			console.error("Error in handleSubmit:", error);
		}
	};
	return (
		<div className="flex">
			<h1 className="w-4/12 bg-red-50 p-4">Add Products</h1>
			<form className="w-8/12 p-4" onSubmit={handleSubmit}>
				<div className="w-full">
					<label>
						Product Name:
						<input
							className="p-2 border rounded-lg block mb-4 w-full"
							type="text"
							name="name"
							placeholder="Write Product Name"
							required
						/>
					</label>
				</div>

				<div className="flex gap-4 flex-col justify-between lg:flex-row">
					<div>
						<label>
							Product Price:
							<input
								className="p-2 border rounded-lg block mb-4 w-full"
								type="number"
								name="price"
								placeholder="$ Product Price"
								required
							/>
						</label>
					</div>

					<div>
						<label>
							Product Category:
							<select
								className="p-2 border rounded-lg block mb-4 w-full"
								name="category"
								required
							>
								<option value=""></option>
								<option value="Convertible">Convertible</option>
								<option value="Coupe">Coupe</option>
								<option value="Crossover">Crossover</option>
								<option value="Grand Tourer (GT)">
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
					<div>
						<label>
							Product Brand:
							<select
								className="p-2 border rounded-lg block mb-4 w-full"
								name="brand"
								required
							>
								<option value=""></option>
								<option value="Aston Martin">
									Aston Martin
								</option>
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
								<option value="Mercedes-Benz">
									Mercedes-Benz
								</option>
								<option value="Nissan">Nissan</option>
								<option value="Porsche">Porsche</option>
								<option value="Rolls-Royce">Rolls-Royce</option>
								<option value="Tesla">Tesla</option>
								<option value="Volkswagen">Volkswagen</option>
								<option value="Volvo">Volvo</option>
							</select>
						</label>
					</div>

					<div>
						<label>
							Product Rating:
							<select
								className="p-2 border rounded-lg block mb-4 w-full"
								min={0}
								max={5}
								type="number"
								name="rating"
								placeholder="Product Rating"
								required
							>
								<option value={0}>0</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
							</select>
						</label>
					</div>
				</div>

				<div>
					<label>
						Product Description:
						<textarea
							className="p-2 border rounded-lg block mb-4 w-full h-28"
							type="text"
							name="description"
							placeholder="Product description"
							required
						/>
					</label>
				</div>

				<div>
					<label>
						Product Image:
						<input
							type="file"
							name="img"
							className="file-input file-input-bordered w-full max-w-xs block mb-4"
							required
						/>
					</label>
				</div>

				<input
					className="btn btn-block btn-accent btn-outline"
					type="submit"
					value="Submit"
				/>
			</form>
		</div>
	);
};

export default AddProductPage;

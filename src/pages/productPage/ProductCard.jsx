
const ProductCard = ({ product}) => {
    const {name,price,category,description,rating,brand,image,createdAt} = product
	return (
		<div className="card bg-[url('./background.jpg')] bg-cover w-full shadow-xl">
			<figure className="p-7 pb-0 relative">
				<img
					className="w-full h-full rounded-xl md:h-[200px]"
					src={image}
					alt={name}
				/>
				<figcaption className="absolute bottom-0 w-fit bg-white px-1 rounded-t-md">Category: {category}</figcaption>
			</figure>
			<div className="card-body">
				<h2 className="card-title">
					{name}
					<div className="badge badge-secondary absolute top-8 right-8">
						Rating: {rating}
					</div>
				</h2>
				<p className="">
					<span className="font-bold">Price:</span> ${price}
				</p>
				<p className="text-justify">{description}</p>
				
			</div>
		</div>
	);
};

export default ProductCard;

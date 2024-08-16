
const ProductCard = ({ product}) => {
    const {name,price,category,description,rating,brand,image,createdAt} = product
	return (
		<div className="card bg-base-100 w-full shadow-xl">
			<figure>
				<img
					className="w-full h-full md:h-[200px]"
					src={image}
					alt={name}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">
					{name}
					<div className="badge badge-secondary">
						Rating: {rating}
					</div>
				</h2>
				<p>{description}</p>
				<div className="card-actions justify-end">
					<div className="badge badge-outline">Rating: {rating}</div>
					<div className="badge badge-outline">Products</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;

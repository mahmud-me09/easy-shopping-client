import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ProductCard from './ProductCard';

const ProductPage = () => {
    const axiosPublic = useAxiosPublic()
    const { status, data:products, error } = useQuery({
        queryKey: ["products"],
        queryFn: async ()=>{
            const result = await axiosPublic.get("/products")
            console.log(result)
            return result.data
        }
    })

    if (status === "pending") {
		return <span>Loading...</span>;
	}

	if (status === "error") {
		return <span>Error: {error.message}</span>;
	}

    return (
		<>
			<h1 className="btn">Products Total: {products.length}</h1>
			<div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				{products.map((product, idx) => {
					return (
						<ProductCard key={idx} product={product}></ProductCard>
					);
				})}
			</div>
		</>
	);
};

export default ProductPage;
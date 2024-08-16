import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useProductFetch = ({ brand, category, price }) => {
	const axiosPublic = useAxiosPublic();

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ["products", { brand, category, price }],
		queryFn: async () => {
			const response = await axiosPublic.get("/products", {
				params: { brand, category, price },
			});
			return response.data.data;
		},
	});

	return { isLoading, isError, data, error };
};

export default useProductFetch;
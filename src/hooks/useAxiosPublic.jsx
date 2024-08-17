import axios from "axios";

const instance = axios.create({
	baseURL: "https://easy-shopping-server-rho.vercel.app",
});
const useAxiosPublic = () => {
	return instance; 
};

export default useAxiosPublic;

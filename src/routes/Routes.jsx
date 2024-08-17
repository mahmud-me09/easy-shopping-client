import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import AddProductPage from "../pages/addProductPage/AddProductPage";
import ProductPage from "../pages/productPage/ProductPage";
import LoginPage from "../pages/authentication/LoginPage";

const Routes = () => {

    const router = createBrowserRouter([
		{
			path: "/",
			element: <App></App>,
			errorElement: <ErrorPage></ErrorPage>,
			children: [
				{
					path: "",
					element: <LoginPage></LoginPage>,
				},
				{
					path: "/addproduct",
					element: <AddProductPage></AddProductPage>,
				},
				{
					path: "/products",
					element: <ProductPage></ProductPage>,
				},
			],
		},
	]);

    return <RouterProvider router={router} />;
};

export default Routes;
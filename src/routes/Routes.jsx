import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import AddProductPage from "../pages/addProductPage/AddProductPage";
import ProductPage from "../pages/productPage/ProductPage";
import LoginPage from "../pages/authentication/LoginPage";
import RegistrationPage from "../pages/authentication/RegistrationPage";

const Routes = () => {

    const router = createBrowserRouter([
		{
			path: "/",
			element: <App></App>,
			errorElement: <ErrorPage></ErrorPage>,
			children: [
				{
					path: "/",
					element: <ProductPage></ProductPage>,
				},
				{
					path: "/login",
					element: <LoginPage></LoginPage>,
				},
				{
					path: "/registration",
					element: <RegistrationPage></RegistrationPage>,
				},
				{
					path: "/addproduct",
					element: <AddProductPage></AddProductPage>,
				},
			],
		},
	]);

    return <RouterProvider router={router} />;
};

export default Routes;
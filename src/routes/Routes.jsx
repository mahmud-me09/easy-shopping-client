import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import AddProductPage from "../pages/addProductPage/AddProductPage";
import ProductPage from "../pages/productPage/ProductPage";
import LoginPage from "../pages/authentication/LoginPage";
import RegistrationPage from "../pages/authentication/RegistrationPage";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

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
					element: <PublicRouter><LoginPage></LoginPage></PublicRouter>,
				},
				{
					path: "/registration",
					element: <PublicRouter><RegistrationPage></RegistrationPage></PublicRouter>,
				},
				{
					path: "/addproduct",
					element: <PrivateRouter><AddProductPage></AddProductPage></PrivateRouter>,
				},
			],
		},
	]);

    return <RouterProvider router={router} />;
};

export default Routes;
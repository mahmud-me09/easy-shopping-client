import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import AddProductPage from "../pages/addProductPage/AddProductPage";

const Routes = () => {

    const router = createBrowserRouter([
		{
			path: "/",
			element: <App></App>,
			errorElement: <ErrorPage></ErrorPage>,
			children: [
				{
					path: "/home",
					element: <div>THis is home route.</div>,
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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";

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
			],
		},
	]);

    return <RouterProvider router={router} />;
};

export default Routes;
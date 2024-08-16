import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

import './index.css'
import Routes from './routes/Routes.jsx';
import AuthProvider from './providers/AuthProvider.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Routes></Routes>
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
);
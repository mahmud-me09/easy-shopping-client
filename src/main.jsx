import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Routes from './routes/Routes.jsx';
import AuthProvider from './providers/AuthProvider.jsx';


createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<Routes></Routes>
		</AuthProvider>
	</StrictMode>
);
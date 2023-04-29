import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { createContext } from "react";
import { AuthContextType, AuthData } from "@/utils/types";
import { useState } from "react";
import Navbar from "../components/Navbar";

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	userId: undefined,
	permissionLevel: undefined,
	updateAuthData: (newAuth) => {
		throw new Error("Attempted to update authentication context before initialization of main application!");
	},
});

export default function App({ Component, pageProps }: AppProps) {
	const [showNavbar, setShowNavbar] = useState(true);

	const [authData, setAuthData] = useState<AuthData>({
		isAuthenticated: false,
		userId: undefined,
		permissionLevel: undefined,
	});

	const authContextValue: AuthContextType = {
		...authData,
		updateAuthData: (autD) => {
			setAuthData(autD);
		},
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			<NextUIProvider>
				{showNavbar && <Navbar />}
				<Component {...pageProps} setShowNavbar={setShowNavbar} />
			</NextUIProvider>
		</AuthContext.Provider>
	);
}

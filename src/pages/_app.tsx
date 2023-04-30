import type {AppProps} from "next/app";
import {NextUIProvider} from "@nextui-org/react";
import {createContext, useCallback, useEffect, useState} from "react";
import {AuthContextType, AuthData} from "@/utils/types";
import Navbar from "../components/Navbar";
import {useRouter} from "next/router";
import {makeAPIRequest} from "@/utils/apiHandler";
import {AuthCheckResponse} from "@/utils/types/apiResponses";

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	userId: undefined,
	permissionLevel: undefined,
	tokenType: undefined,
	orgId: undefined,
	updateAuthData: (newAuth) => {
		throw new Error("Attempted to update authentication context before initialization of main application!");
	},
});

export default function App({Component, pageProps}: AppProps) {
	const [showNavbar, setShowNavbar] = useState(true);
	
	const [authData, setAuthData] = useState<AuthData>({
		isAuthenticated: false,
		userId: undefined,
		permissionLevel: undefined,
		tokenType: undefined,
		orgId: undefined
	});
	
	const authContextValue: AuthContextType = {
		...authData,
		updateAuthData: (autD) => {
			setAuthData(autD);
		},
	};
	
	const router = useRouter()
	
	const updateAuth = useCallback(async () => {
		const {isError, isSuccess, code, error, data} = await makeAPIRequest<AuthCheckResponse>({
			endpointPath: "/api/me",
			requestMethod: "POST"
		})
		if (isError && error) {
			console.error(error)
			return
		}
		if (isSuccess && data) {
			const {requestStatus} = data
			if (requestStatus === "SUCCESS") {
				const {authStatus, authData} = data
				if (authStatus === "NO_AUTH") {
					setAuthData({
						isAuthenticated: false,
						userId: undefined,
						orgId: undefined,
						tokenType: undefined,
						permissionLevel: undefined
					})
					return
				}
				if (authStatus === "AUTH_SUCCESS") {
					const {orgId, permissionLevel, userId, tokenType} = authData!
					setAuthData({
						isAuthenticated: true,
						permissionLevel: permissionLevel,
						orgId: orgId,
						tokenType: tokenType,
						userId: userId
					})
					return
				}
			}
		}
	}, [router.pathname, router.query.toString()])
	
	useEffect(() => {
		updateAuth()
	}, [router.pathname, router.query.toString()])
	
	return (
		<AuthContext.Provider value={authContextValue}>
			<NextUIProvider>
				{showNavbar && <Navbar/>}
				<Component {...pageProps} setShowNavbar={setShowNavbar}/>
			</NextUIProvider>
		</AuthContext.Provider>
	);
}

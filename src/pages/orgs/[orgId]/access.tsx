import { useRouter } from "next/router";
export default function Access() {
	const router = useRouter();
	console.log(router.query);
	return <h1></h1>;
}

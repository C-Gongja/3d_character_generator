import { Outlet } from "react-router-dom";
import NavBar from "./navbar/navbar";

export default function Layout() {

	return (
		<div className="">
			<NavBar />
			<div className="">
				<Outlet />
			</div>
			{/* footer */}
		</div >
	);
}
import { Outlet } from "react-router-dom";
import NavBar from "./navbar/navbar";

export default function Layout() {

	return (
		<div className="">
			<NavBar />
			<div className="pt-20">
				<Outlet />
			</div>
			{/* footer */}
		</div >
	);
}
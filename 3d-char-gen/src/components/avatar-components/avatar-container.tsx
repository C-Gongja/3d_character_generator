import { } from "react";
import UtilButtons from "./util-buttons";
import AvatarScene from "./avatar-scene";


export default function AvatarContainer() {

	return (
		<div className="grid grid-cols-1 grid-rows-2 gap-4 ">
			<AvatarScene />
			<UtilButtons />
		</div>
	);
}

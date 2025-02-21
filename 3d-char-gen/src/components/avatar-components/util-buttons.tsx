import { } from "react";
import { useCustomStore } from "../../state-management/userCustom-store";

export default function UtilButtons() {
	const { updateUserCustomProfile, resetUserCustomProfile } = useCustomStore();

	const handleRandom = () => {
		// 랜덤 함수 구현 필요
	};

	const handleSave = () => {
		updateUserCustomProfile();
	};

	const handleReset = () => {
		resetUserCustomProfile();
	};

	return (
		<div className="flex flex-col items-center gap-4 p-4 row-start-3">
			<button
				onClick={handleRandom}
				className="border border-white h-10 w-1/2 rounded-2xl text-xl cursor-pointer hover:bg-gray-500 transition"
			>
				Random
			</button>
			<button
				onClick={handleSave}
				className="border border-white h-10 w-1/2 rounded-2xl text-xl cursor-pointer hover:bg-gray-500 transition"
			>
				Save
			</button>
			<button
				onClick={handleReset}
				className="border border-white h-10 w-1/2 rounded-2xl text-xl cursor-pointer hover:bg-gray-500 transition"
			>
				Reset
			</button>
		</div>
	);
}

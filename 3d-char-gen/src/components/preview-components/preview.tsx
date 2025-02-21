import IDPreview from "./id-preview";
import IDCustom from "./id-custom";

export default function Preview() {

	return (
		<div className="flex flex-col p-[20px] gap-[20px]">
			<IDPreview />
			<IDCustom />
		</div>
	);
}

import { Saturation, Hue, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function ColorOptions() {
	const [color, setColor] = useColor("rgb(86 30 203)");

	return (
		<div className="w-full border border-red-500 grid grid-cols-2 grid-rows-1 p-4 gap-4">
			<div className="flex flex-col gap-2 ">
				<Saturation height={180} color={color} onChange={setColor} />
				<Hue color={color} onChange={setColor} />
			</div>
			<div className="p-4 text-white">
				color options
			</div>
		</div>
	);
}

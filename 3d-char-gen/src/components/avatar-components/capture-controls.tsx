import { IoCamera, IoClose } from "react-icons/io5";

interface CaptureControlsProps {
	captureArea: { x: number; y: number; width: number; height: number } | null;
	onInitializeCapture: () => void;
	onCapture: () => void;
	onClose: () => void;
	onAdjustPosition: (axis: "x" | "y", increment: number) => void;
	onAdjustSize: (dimension: "width" | "height", value: number) => void;
	stepSize: number;
}

export function CaptureControls({
	captureArea,
	onInitializeCapture,
	onCapture,
	onClose,
	onAdjustPosition,
	onAdjustSize,
	stepSize,
}: CaptureControlsProps) {
	return (
		<div className="absolute bottom-4 right-4 flex flex-row gap-4 items-center">
			{!captureArea && (
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
					onClick={onInitializeCapture}
				>
					<IoCamera />
				</button>
			)}

			{captureArea && (
				<>
					<div className="relative w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-5">
						<button
							className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-600"
							onClick={() => onAdjustPosition("y", -stepSize)}
						>
							↑
						</button>
						<button
							className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-600"
							onClick={() => onAdjustPosition("y", stepSize)}
						>
							↓
						</button>
						<button
							className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-600"
							onClick={() => onAdjustPosition("x", -stepSize)}
						>
							←
						</button>
						<button
							className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-600"
							onClick={() => onAdjustPosition("x", stepSize)}
						>
							→
						</button>
					</div>

					<div className="flex flex-col gap-2 w-48">
						<label className="text-white">
							Width: {captureArea.width}px
							<input
								type="range"
								min="50"
								max="500"
								value={captureArea.width}
								onChange={(e) => onAdjustSize("width", parseInt(e.target.value))}
								className="w-full accent-blue-500"
							/>
						</label>
						<label className="text-white">
							Height: {captureArea.height}px
							<input
								type="range"
								min="50"
								max="500"
								value={captureArea.height}
								onChange={(e) => onAdjustSize("height", parseInt(e.target.value))}
								className="w-full accent-blue-500"
							/>
						</label>
					</div>

					<div className="flex gap-2">
						<button
							className="bg-blue-500 text-white px-4 py-4 rounded hover:bg-blue-600 transition"
							onClick={onCapture}
						>
							<IoCamera />
						</button>
						<button
							className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 transition"
							onClick={onClose}
						>
							<IoClose />
						</button>
					</div>
				</>
			)}
		</div>
	);
}
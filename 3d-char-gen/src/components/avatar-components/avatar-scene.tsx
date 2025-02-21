import { useRef, useState, useEffect } from "react";
import { AvatarCanvas } from "./avatar-canvas";
import { CaptureOverlay } from "./capture-overlay";
import { CaptureControls } from "./capture-controls";

export default function AvatarScene() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [captureArea, setCaptureArea] = useState<{
		x: number;
		y: number;
		width: number;
		height: number;
	} | null>(null);
	const stepSize = 10;

	const initializeCaptureArea = () => {
		setCaptureArea({ x: 100, y: 100, width: 200, height: 200 });
	};

	const closeCapture = () => {
		setCaptureArea(null);
	};

	const captureCanvas = () => {
		if (!captureArea || !canvasRef.current) return;
		const sourceCanvas = canvasRef.current;
		const dpr = window.devicePixelRatio || 1;
		const cssWidth = sourceCanvas.clientWidth;
		const cssHeight = sourceCanvas.clientHeight;
		const canvasWidth = sourceCanvas.width;
		const canvasHeight = sourceCanvas.height;
		const scaleX = canvasWidth / cssWidth;
		const scaleY = canvasHeight / cssHeight;

		const { x, y, width, height } = captureArea;
		const pixelX = x * scaleX;
		const pixelY = y * scaleY;
		const pixelWidth = width * scaleX;
		const pixelHeight = height * scaleY;

		const offscreenCanvas = document.createElement("canvas");
		offscreenCanvas.width = pixelWidth;
		offscreenCanvas.height = pixelHeight;
		const ctx = offscreenCanvas.getContext("2d");

		if (!ctx) {
			console.error("2D context를 가져올 수 없습니다.");
			return;
		}

		ctx.drawImage(
			sourceCanvas,
			pixelX,
			pixelY,
			pixelWidth,
			pixelHeight,
			0,
			0,
			pixelWidth,
			pixelHeight
		);

		//send to backdend


		const dataURL = offscreenCanvas.toDataURL("image/png");
		const link = document.createElement("a");
		link.href = dataURL;
		link.download = "save/avatar-capture.png";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const adjustSize = (dimension: "width" | "height", value: number) => {
		if (!captureArea) return;
		setCaptureArea((prev) => ({
			...prev!,
			[dimension]: Math.max(50, value),
		}));
	};

	const adjustPosition = (axis: "x" | "y", increment: number) => {
		if (!captureArea || !canvasRef.current) return;
		const maxX = canvasRef.current.clientWidth - captureArea.width;
		const maxY = canvasRef.current.clientHeight - captureArea.height;

		setCaptureArea((prev) => ({
			...prev!,
			[axis]:
				axis === "x"
					? Math.max(0, Math.min(prev![axis] + increment, maxX))
					: Math.max(0, Math.min(prev![axis] + increment, maxY)),
		}));
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!captureArea) return;

			switch (event.key) {
				case "ArrowUp":
					adjustPosition("y", -stepSize);
					break;
				case "ArrowDown":
					adjustPosition("y", stepSize);
					break;
				case "ArrowLeft":
					adjustPosition("x", -stepSize);
					break;
				case "ArrowRight":
					adjustPosition("x", stepSize);
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [captureArea]);

	return (
		<div className="h-full border-4 border-black rounded-xl overflow-hidden row-span-2 relative">
			<AvatarCanvas canvasRef={canvasRef} />
			<CaptureOverlay captureArea={captureArea} />
			<CaptureControls
				captureArea={captureArea}
				onInitializeCapture={initializeCaptureArea}
				onCapture={captureCanvas}
				onClose={closeCapture}
				onAdjustPosition={adjustPosition}
				onAdjustSize={adjustSize}
				stepSize={stepSize}
			/>
		</div>
	);
}
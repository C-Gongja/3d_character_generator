interface CaptureOverlayProps {
	captureArea: { x: number; y: number; width: number; height: number } | null;
}

export function CaptureOverlay({ captureArea }: CaptureOverlayProps) {
	if (!captureArea) return null;

	return (
		<div
			className="absolute border-2 border-red-500 pointer-events-none"
			style={{
				left: captureArea.x,
				top: captureArea.y,
				width: captureArea.width,
				height: captureArea.height,
			}}
		/>
	);
}
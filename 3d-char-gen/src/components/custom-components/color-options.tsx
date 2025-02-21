import { ColorPicker, useColor, ColorService, IColor } from "react-color-palette";
import "react-color-palette/css";
import { useConfigStore } from "../../state-management/custom-store";
import { useEffect, useState } from "react";
import { useCustomStore } from "../../state-management/userCustom-store";

export default function ColorOptions() {
	const [colorOptions, setColorOptions] = useState<string[]>([]);
	const { customization, currentCategory, updateColor, isLoading: configLoading } = useConfigStore();
	const { userCustomProfile, updateField, isLoading: userLoading } = useCustomStore();
	//use isLoading to wait until gets all customs and usercustom information. does it really necessary and important? probably...
	const [color, setColor] = useColor("#ffff");
	const [isInitialized, setIsInitialized] = useState(false);

	const hexToIColor = (hex: string): IColor => {
		const rgb = ColorService.toRgb(hex); // hex를 rgb로 변환
		const hsv = ColorService.rgb2hsv(rgb); // rgb를 hsv로 변환
		// IColor types
		return { hex, rgb, hsv };
	};

	// 데이터가 모두 로드된 후 색상을 가져오기
	useEffect(() => {
		if (configLoading || userLoading) return; // 둘 중 하나라도 로딩 중이면 실행 X

		if (currentCategory) {
			const storedColorHex = userCustomProfile[currentCategory.name]?.color;
			if (!storedColorHex) return;

			const storedColor = hexToIColor(storedColorHex);

			// 초기 설정 시에만 색상을 업데이트하고, updateField 호출 안 함
			if (!isInitialized) {
				setColor(storedColor);
				setIsInitialized(true); // 초기 설정 완료
			}
			// currentCategory 에 color_options가 저장이 안되면 colors가 없어서 색갈 options을 바꾸지 못함
			if (currentCategory?.color_options) {
				setColorOptions(currentCategory.color_options);
			} else {
				setColorOptions([]);
			}
		}
	}, [configLoading, userLoading, currentCategory, userCustomProfile]);

	// 색상 변경 시 updateColor 및 updateField 실행
	useEffect(() => {
		if (!currentCategory || !isInitialized) return; // 초기 설정 전에는 실행 X

		updateColor(color.hex);

		// 저장된 색상과 현재 선택된 색상이 다를 때만 updateField 실행
		const storedColorHex = userCustomProfile[currentCategory.name]?.color;
		if (storedColorHex !== color.hex) {
			updateField(currentCategory.name, {
				asset_id: customization[currentCategory.name]?.id,
				color: color.hex,
			});
		}
	}, [color]);

	return (
		<div className="w-full grid grid-cols-2 grid-rows-1 p-4 gap-4">
			<div className="flex flex-col gap-2 ">
				<ColorPicker height={100} hideAlpha={true} hideInput={["rgb", "hsv"]} color={color} onChange={setColor} />
			</div>
			<div className="p-4 text-white">
				{colorOptions.map((color) => (
					<button
						key={color}
						className={`w-8 h-8 rounded-full m-2  ${customization[currentCategory.name].color === color
							? "border-1 border-white scale-125"
							: "border-3 border-white"
							}`}
						style={{ backgroundColor: color }}
						onClick={() => setColor(hexToIColor(color))}
					/>
				))}
			</div>
		</div>
	);
}

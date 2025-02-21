import CustomTab from "./custom-tab";
import CustomAssets from "./custom-assets";
import ColorOptions from "./color-options";

export default function CustomMenu() {
	// const { fetchCustoms } = useConfigStore();

	// useEffect(() => {
	// 	fetchCustoms();
	// }, []);

	return (
		<div className="flex flex-col p-[20px] gap-[20px]">
			<CustomTab />
			<CustomAssets />
			<ColorOptions />
		</div>
	);
}

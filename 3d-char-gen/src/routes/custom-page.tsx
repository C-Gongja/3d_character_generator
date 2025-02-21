import CustomMenu from "../components/custom-components/custom-menu";
import AvatarContainer from "../components/avatar-components/avatar-container";
import Preview from "../components/preview-components/preview";
import { useConfigStore } from "../state-management/custom-store";
import { useCustomStore } from "../state-management/userCustom-store";
import { useEffect } from "react";


function CustomPage() {
	// const { categories, currentCategories, fetchCustoms, setCurrentCategory } = useConfigStore();
	const { fetchCustoms } = useConfigStore();
	const { fetchUserCustoms } = useCustomStore();

	useEffect(() => {
		const loadData = async () => {
			await fetchCustoms();
			await fetchUserCustoms();
		};

		loadData();
	}, [fetchCustoms, fetchUserCustoms]);

	return (
		<div className="grid grid-cols-[1.3fr_1fr_1fr] gap-5 h-[calc(100vh-15vh)] font-[PixelFont] p-10">
			<CustomMenu />
			<AvatarContainer />
			<Preview />
		</div>
	);
};

export default CustomPage;

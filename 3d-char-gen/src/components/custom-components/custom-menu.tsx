import { useEffect } from "react";
import { useConfigStore } from "../../custom-store";
import CustomTab from "./custom-tab";
import styled from "styled-components";
import CustomAssets from "./custom-assets";
import ColorOptions from "./color-options";

const CustomContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	border: 1px solid white;
`;
export default function CustomMenu() {
	const { fetchCustoms } = useConfigStore();

	useEffect(() => {
		fetchCustoms();
	}, []);

	return (
		<CustomContainer>
			<CustomTab />
			<CustomAssets />
			<ColorOptions />
		</CustomContainer>
	);
}

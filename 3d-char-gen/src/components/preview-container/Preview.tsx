import { useState } from "react";
import styled from "styled-components";
import IDPreview from "./IDPreview";
import IDCustom from "./IDCustom";

const PreviewContainer = styled.div`
	padding: 20px;
	border: 1px solid white;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const initialFormValues = {
	name: "",
	gender: "",
	place: "",
	description: "",
	serialNum: "",
};

export default function Preview() {
	const [formValues, setFormValues] = useState(initialFormValues);

	return (
		<PreviewContainer>
			<IDPreview formValues={formValues} />
			<IDCustom setFormValues={setFormValues} />
		</PreviewContainer>
	);
}

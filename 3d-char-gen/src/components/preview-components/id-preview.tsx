import { } from "react";
import styled from "styled-components";


const PreviewContainer = styled.div`
	padding: 20px;
	border: 1px solid white;
	height: 250px;
`;

const StyledH1 = styled.h1`
  font-size: 30px;
`;


type FormValues = {
	name: string;
	gender: string;
	place: string;
	description: string;
	serialNum: string;
};

export default function IDPreview({ formValues }: { formValues: FormValues }) {
	// const [menu, setMenu] = useState(1);

	return (
		< PreviewContainer >
			<StyledH1>ID Preview</StyledH1>
			<p><strong>Name:</strong> {formValues.name || "N/A"}</p>
			<p><strong>Gender:</strong> {formValues.gender || "N/A"}</p>
			<p><strong>Place:</strong> {formValues.place || "N/A"}</p>
			<p><strong>Description:</strong> {formValues.description || "N/A"}</p>
			<p><strong>User ID:</strong> {formValues.serialNum || "N/A"}</p>
		</PreviewContainer >
	);
}

import React, { } from "react";
import styled from "styled-components";
import { useCustomStore } from "../../state-management/userCustom-store";
import { useConfigStore } from "../../state-management/custom-store";

const FunctionsContainer = styled.div`
	border: 1px solid white;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
`;

const FunctionBtn = styled.button`
	border: 1px solid white;
	height: 50px;
	width: 50%;
	border-radius: 20px;
	font-size: 25px;
	cursor: pointer;

	&:hover{
		background-color: gray;
	}
`;

export default function UtilButtons() {
	const { updateUserCustomProfile, resetUserCustomProfile } = useCustomStore();

	const handleRandom = () => {

	}

	const handleSave = () => {
		updateUserCustomProfile();
	}

	const handleReset = () => {
		resetUserCustomProfile();
	}

	return (
		<FunctionsContainer>
			<FunctionBtn onClick={handleRandom}>Random</FunctionBtn>
			<FunctionBtn onClick={handleSave}>Save</FunctionBtn>
			<FunctionBtn onClick={handleReset}>Reset</FunctionBtn>
		</FunctionsContainer>
	);
}

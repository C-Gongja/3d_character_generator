import React, { } from "react";
import styled from "styled-components";
import { useCustomStore } from "../../state-management/userCustom-store";

const IDCustomContainer = styled.div`
  padding: 20px;
  border: 1px solid white;
  height: auto;
`;

const CustomInput = styled.textarea`
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: black;
  border: 1px solid white;
	font-size: 20px;
`;


export default function IDCustom() {
	const { userProfile, setUserProfile } = useCustomStore();
	const maxLength = 63;

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setUserProfile({
			...userProfile,  // 기존 상태를 복사
			[name]: value,   // 변경된 필드만 업데이트
		});
	};

	const fields = [
		{ id: "name", label: userProfile.name ? userProfile.name : "Name" },
		{ id: "gender", label: userProfile.gender ? userProfile.gender : "Gender" },
		{ id: "location", label: userProfile.location ? userProfile.location : "Location" },
		{ id: "bio", label: userProfile.bio ? userProfile.bio : "Bio" },
		{ id: "serialNum", label: userProfile.serialNum ? userProfile.serialNum : "User ID" },
	];

	return (
		<IDCustomContainer>
			{fields.map((field) => (
				<div key={field.id}>
					<h2>{field.id}</h2>
					<CustomInput
						name={field.id}
						placeholder={field.label}
						maxLength={maxLength + 1}
						onChange={handleChange}
					/>
				</div>
			))}
		</IDCustomContainer>
	);
}

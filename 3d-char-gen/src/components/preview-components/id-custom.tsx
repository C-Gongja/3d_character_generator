import React, { } from "react";
import styled from "styled-components";
import { useCustomStore } from "../../state-management/userCustom-store";
import { UserCustomProfile } from "../../state-management/userCustom-Interface";

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
	const { userCustomProfile, updateField } = useCustomStore();
	const maxLength = 63;

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		updateField(name as keyof UserCustomProfile, value);
	};

	const fields = [
		{ id: "username", label: userCustomProfile.username ? userCustomProfile.username : "Name" },
		{ id: "gender", label: userCustomProfile.gender ? userCustomProfile.gender : "Gender" },
		{ id: "location", label: userCustomProfile.location ? userCustomProfile.location : "Location" },
		{ id: "bio", label: userCustomProfile.bio ? userCustomProfile.bio : "Bio" },
		{ id: "serial_num", label: userCustomProfile.serial_num ? userCustomProfile.serial_num : "User ID" },
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
						value={userCustomProfile[field.id as keyof UserCustomProfile]}
						onChange={handleChange}
					/>
				</div>
			))}
		</IDCustomContainer>
	);
}

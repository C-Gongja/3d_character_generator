import React, { } from "react";
import styled from "styled-components";

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

type FormValues = {
	name: string;
	gender: string;
	location: string;
	bio: string;
	serialNum: string;
};

export default function IDCustom({ userProfile, setUserProfile }: { userProfile: FormValues; setUserProfile: React.Dispatch<React.SetStateAction<FormValues>>; }) {
	const maxLength = 10;

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setUserProfile((prev) => ({
			...prev,
			[name]: value,
		}));
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

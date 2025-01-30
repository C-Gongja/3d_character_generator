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
	place: string;
	description: string;
	serialNum: string;
};

export default function IDCustom({ setFormValues }: { setFormValues: React.Dispatch<React.SetStateAction<FormValues>>; }) {
	const maxLength = 10;

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const fields = [
		{ id: "name", label: "Name" },
		{ id: "gender", label: "Gender" },
		{ id: "place", label: "Place" },
		{ id: "description", label: "Description" },
		{ id: "serialNum", label: "User ID" },
	];

	return (
		<IDCustomContainer>
			{fields.map((field) => (
				<div key={field.id}>
					<h2>{field.label}</h2>
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

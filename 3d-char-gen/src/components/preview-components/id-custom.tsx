import React from "react";
import { useCustomStore } from "../../state-management/userCustom-store";
import { UserCustomProfile } from "../../state-management/userCustom-Interface";

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
		<div className="py-5 h-auto border-t-1 border-white">
			{fields.map((field) => (
				<div key={field.id} className="mb-1">
					<h2 className="text-lg font-semibold">{field.id}</h2>
					<textarea
						name={field.id}
						placeholder={field.label}
						maxLength={maxLength + 1}
						value={field.label}
						onChange={handleChange}
						className="w-full h-[45px] p-2 bg-black text-white border border-white rounded-lg flex justify-center text-xl"
					/>
				</div>
			))}
		</div>
	);
}

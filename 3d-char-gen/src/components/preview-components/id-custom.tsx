import { ChangeEvent } from "react";
import { UserCustomProfile } from "../../types/useUserCustomType";
import { useCustomStore } from "../../state-management/useUserCustomStore";

export default function IDCustom() {
	const { userCustomProfile, updateField } = useCustomStore();
	const maxLength = 63;

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const key = name.toLowerCase() as keyof UserCustomProfile; // name을 소문자로 변환
		console.log("name", key, "value: ", value);
		updateField(key, value);
	};

	const fields = [
		{ id: "Username", key: "username" },
		{ id: "Gender", key: "gender" },
		{ id: "Location", key: "location" },
		{ id: "Bio", key: "bio" },
		{ id: "Serial_num", key: "serial_num" },
	];

	return (
		<div className="py-5 h-auto border-t-1 border-white">
			{fields.map((field) => (
				<div key={field.id} className="mb-1">
					<h2 className="text-lg font-semibold">{field.id}</h2>
					<textarea
						name={field.id}
						placeholder={userCustomProfile[field.key] || field.id}
						maxLength={maxLength + 1}
						value={userCustomProfile[field.key] || ""} // 상태에서 직접 값 가져오기
						onChange={handleChange}
						className="w-full h-[45px] p-2 bg-black text-white border border-white rounded-lg flex justify-center text-xl"
					/>
				</div>
			))}
		</div>
	);
}
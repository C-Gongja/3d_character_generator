import { useCustomStore } from '../../state-management/useUserCustomStore';

export default function IDPreview() {
	const { userCustomProfile } = useCustomStore();

	return (
		<div className="grid grid-cols-[1fr_2fr] gap-8 p-5 border border-gray-300 rounded-lg shadow-md w-[450px] h-[250px] break-words">
			<div className="flex items-center justify-center bg-gray-200 w-[150px] h-[150px] overflow-hidden rounded-lg">
				<img className="object-cover w-full h-auto over" src="path_to_avatar_image.jpg" alt="avatar" />
			</div>
			<div className="flex flex-col break-words">
				<p className="text-5xl flex items-start h-full">{userCustomProfile.username || "N/A"}</p>
				<p className="my-1 text-lg"><strong>Gender:</strong> {userCustomProfile.gender || "N/A"}</p>
				<p className="my-1 text-lg"><strong>Location:</strong> {userCustomProfile.location || "N/A"}</p>
				<p className="my-1 text-lg"><strong>Bio:</strong> {userCustomProfile.bio || "N/A"}</p>
				<p className="my-1 text-lg"><strong>User ID:</strong> {userCustomProfile.serial_num || "N/A"}</p>
			</div>
		</div>
	);
}


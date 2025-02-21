import { } from "react";

const socialIcons = [
	{ src: "/icons/social_logo/google-icon.svg", alt: "Google" },
	{ src: "/icons/social_logo/facebook-icon.svg", alt: "Facebook" },
	{ src: "/icons/social_logo/microsoft-icon.svg", alt: "Microsoft" },
	{ src: "/icons/social_logo/Apple_logo_black.svg", alt: "Apple" },
];

export default function ExternalAuthButtons() {
	return (
		<div className="flex justify-center items-center gap-4 mt-8">
			{socialIcons.map(({ src, alt }) => (
				<button
					key={alt}
					className="w-15 h-15 flex items-center justify-center bg-white rounded-full border-none cursor-pointer transition-transform duration-300 hover:scale-110 shadow-md"
				>
					<img src={src} alt={alt} className="w-8 h-8" />
				</button>
			))}
		</div>
	);
}

import React from "react";

const socialIcons = [
	{ src: "/icons/logo/google-icon.svg", alt: "Google" },
	{ src: "/icons/logo/facebook-icon.svg", alt: "Facebook" },
	{ src: "/icons/logo/microsoft-icon.svg", alt: "Microsoft" },
	{ src: "/icons/logo/Apple_logo_black.svg", alt: "Apple" },
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

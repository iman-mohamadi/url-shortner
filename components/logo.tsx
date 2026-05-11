import type React from "react";

export const LogoIcon = (props: React.ComponentProps<"svg">) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
		<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
	</svg>
);

export const Logo = (props: React.ComponentProps<"svg">) => (
	<svg viewBox="0 0 140 24" fill="currentColor" {...props}>
		<g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
			<path d="M6 10a3 3 0 0 0 4.5.3l1.8-1.8a3 3 0 0 0-4.24-4.24L7 5.3" />
			<path d="M10 8a3 3 0 0 0-4.5-.3l-1.8 1.8a3 3 0 0 0 4.24 4.24L9 12.7" />
		</g>
		<text x="22" y="16" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill="currentColor">
			URL Shortener
		</text>
	</svg>
);

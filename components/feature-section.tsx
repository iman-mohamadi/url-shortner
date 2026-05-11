import { cn } from "@/lib/utils";
import type React from "react";
import { DecorIcon } from "@/components/ui/decor-icon";
import { RiBarChartLine, RiFlashlightLine, RiShieldLine, RiQrCodeLine, RiTimeLine, RiGlobalLine } from "@remixicon/react";

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
};

export function FeatureSection() {
	return (
		<div id="features" className="mx-auto max-w-5xl py-16">
			<h2 className="mb-5 text-center font-medium text-2xl md:text-3xl">
				Everything you need for link management
			</h2>
			<p className="mb-10 text-center text-muted-foreground">
				Powerful features to help you create, track, and optimize your links
			</p>

			<div className="relative">
				{/* Corner Icons */}
				<DecorIcon
					className="size-6 stroke-2 stroke-border"
					position="top-left"
				/>
				<DecorIcon
					className="size-6 stroke-2 stroke-border"
					position="top-right"
				/>
				<DecorIcon
					className="size-6 stroke-2 stroke-border"
					position="bottom-left"
				/>
				<DecorIcon
					className="size-6 stroke-2 stroke-border"
					position="bottom-right"
				/>

				<DashedLine className="-top-[1.5px] right-3 left-3" />
				<DashedLine className="top-3 -right-[1.5px] bottom-3" />
				<DashedLine className="top-3 bottom-3 -left-[1.5px]" />
				<DashedLine className="right-3 -bottom-[1.5px] left-3" />

				<div className="grid grid-cols-1 md:grid-cols-3">
					{features.map((feature, index) => (
						<div
							className={cn(
								"group [&_svg]:mask-b-from-0% relative p-8 [&_svg]:size-7 [&_svg]:text-muted-foreground",
								index < 3 ? "border-b border-dashed md:border-b-0" : ""
							)}
							key={feature.title}
						>
							{feature.icon}
							<h3 className="font-medium text-lg">{feature.title}</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{feature.description}
							</p>
							{index < features.length - 1 && (
								<DashedLine className="right-5 bottom-0 left-5 hidden md:block md:top-5 md:right-0 md:bottom-5 md:left-full" />
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function DashedLine({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("absolute border-collapse border border-dashed", className)}
			{...props}
		/>
	);
}

const features: FeatureType[] = [
	{
		title: "Lightning Fast",
		icon: <RiFlashlightLine />,
		description: "Create short links instantly with our optimized infrastructure.",
	},
	{
		title: "Detailed Analytics",
		icon: <RiBarChartLine />,
		description: "Track clicks, locations, devices, and referrers in real-time.",
	},
	{
		title: "QR Code Generation",
		icon: <RiQrCodeLine />,
		description: "Generate QR codes for any link with a single click.",
	},
	{
		title: "Custom Aliases",
		icon: <RiTimeLine />,
		description: "Create branded, memorable links with custom slugs.",
	},
	{
		title: "Link Expiration",
		icon: <RiGlobalLine />,
		description: "Set expiration dates for temporary campaigns and promotions.",
	},
	{
		title: "Secure & Private",
		icon: <RiShieldLine />,
		description: "Enterprise-grade security with SSL encryption on all links.",
	},
];

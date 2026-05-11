import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { RiArrowRightLine } from "@remixicon/react";

export function CallToAction() {
	return (
		<div id="api" className="relative mx-auto flex w-full max-w-3xl flex-col justify-between border-x">
			<FullWidthDivider className="-top-px" />
			<div className="border-b px-2 py-8">
				<h2 className="text-center font-semibold text-lg md:text-2xl">
					Ready to supercharge your links?
				</h2>
				<p className="text-balance text-center text-muted-foreground text-sm md:text-base">
					Join thousands of users who trust LinkSnip for their link management needs.
				</p>
			</div>
			<div className="flex items-center justify-center gap-2 bg-secondary/80 p-4 dark:bg-secondary/40">
				<Button variant="outline">View API Docs</Button>
				<Button>
					Get Started Free{" "}
					<RiArrowRightLine data-icon="inline-end" />
				</Button>
			</div>
			<FullWidthDivider className="-bottom-px" />
		</div>
	);
}

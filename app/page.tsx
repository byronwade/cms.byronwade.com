import { Code2, Github, Layout, Palette, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "CMS Playground - A Visual Experiment",
	description:
		"A fun project exploring visual concepts and design ideas for CMS systems. Built with Next.js to test vibe coding skills.",
	openGraph: {
		title: "CMS Playground - A Visual Experiment",
		description:
			"A fun project exploring visual concepts and design ideas for CMS systems.",
		type: "website",
	},
};

export default function Home() {
	return (
		<main className="min-h-screen bg-background">
			<div className="relative flex justify-center py-16 px-4 sm:py-20 md:py-24">
				<div className="flex flex-col gap-10 sm:gap-12 items-center w-full max-w-2xl">
					{/* Header */}
					<div className="flex flex-col gap-6 items-start w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
						<Link
							href="/"
							className="group flex items-center gap-3"
							aria-label="Home"
						>
							<div className="relative">
								<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent blur-xl group-hover:blur-2xl transition-all duration-500" />
								<div className="relative flex items-center justify-center size-14 sm:size-16 rounded-xl bg-gradient-to-br from-muted to-muted/50 border border-border/50 group-hover:border-primary/30 transition-all duration-300">
									<Layout className="size-7 sm:size-8 text-foreground/80" />
								</div>
							</div>
							<div>
								<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
									CMS Playground
								</h1>
								<p className="text-sm text-muted-foreground">
									A visual experiment
								</p>
							</div>
						</Link>

						<nav
							className="flex flex-wrap gap-4 sm:gap-6 items-center"
							aria-label="Main navigation"
						>
							<Link
								href="/cms"
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								Admin Panel
							</Link>
							<a
								href="https://github.com/byronwade/cms.byronwade.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								Source Code
							</a>
							<a
								href="https://byronwade.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								About Me
							</a>
						</nav>
					</div>

					{/* Main Content */}
					<div className="flex flex-col gap-5 text-base text-foreground animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
						<p className="leading-relaxed">
							This is a <span className="font-medium">fun side project</span>{" "}
							where I explore visual concepts and design ideas for content
							management systems. It&apos;s not a production-ready CMS—just a
							playground to test my vibe coding skills and see what interesting
							UI/UX patterns I can come up with.
						</p>

						<p className="leading-relaxed">
							Built with{" "}
							<a
								href="https://nextjs.org"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium underline decoration-muted-foreground/40 underline-offset-[3px] hover:decoration-foreground transition-colors"
							>
								Next.js
							</a>
							,{" "}
							<a
								href="https://tailwindcss.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium underline decoration-muted-foreground/40 underline-offset-[3px] hover:decoration-foreground transition-colors"
							>
								Tailwind CSS
							</a>
							, and{" "}
							<a
								href="https://ui.shadcn.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium underline decoration-muted-foreground/40 underline-offset-[3px] hover:decoration-foreground transition-colors"
							>
								shadcn/ui
							</a>
							. The goal is to experiment with modern design patterns and see
							how far I can push the boundaries of what a CMS interface could
							look like.
						</p>

						<p className="leading-relaxed">
							Feel free to poke around the{" "}
							<Link
								href="/cms"
								className="font-medium underline decoration-muted-foreground/40 underline-offset-[3px] hover:decoration-foreground transition-colors"
							>
								admin panel
							</Link>{" "}
							to see what I&apos;ve been experimenting with. The code is
							open-source if you want to dig deeper.
						</p>
					</div>

					{/* Feature Highlights */}
					<div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
						<div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30">
							<Sparkles className="size-5 text-muted-foreground shrink-0 mt-0.5" />
							<div>
								<h3 className="font-medium text-sm">Visual Experiments</h3>
								<p className="text-xs text-muted-foreground mt-1">
									Testing design ideas and UI patterns
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30">
							<Code2 className="size-5 text-muted-foreground shrink-0 mt-0.5" />
							<div>
								<h3 className="font-medium text-sm">Vibe Coding</h3>
								<p className="text-xs text-muted-foreground mt-1">
									Building for fun, not deadlines
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30">
							<Palette className="size-5 text-muted-foreground shrink-0 mt-0.5" />
							<div>
								<h3 className="font-medium text-sm">Design Focus</h3>
								<p className="text-xs text-muted-foreground mt-1">
									Exploring what CMS could look like
								</p>
							</div>
						</div>
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-wrap gap-3 items-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-450">
						<Link
							href="/cms"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
						>
							<Layout className="size-4" />
							Explore the CMS
						</Link>
						<a
							href="https://github.com/byronwade/cms.byronwade.com"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
						>
							<Github className="size-4" />
							View Source
						</a>
					</div>

					{/* Footer */}
					<div className="w-full pt-8 border-t animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
						<p className="text-xs text-center text-muted-foreground">
							Built by{" "}
							<a
								href="https://byronwade.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium hover:text-foreground transition-colors"
							>
								Byron Wade
							</a>{" "}
							as a creative exercise. Not affiliated with any actual CMS
							product.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

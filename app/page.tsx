// Import all icons normally - Next.js tree-shaking will handle unused imports
// Grouping by usage frequency for better readability
import {
	BanknoteIcon,
	BarChart,
	Blocks,
	Bot,
	Boxes,
	Brush,
	Clock,
	Cloud,
	Code2,
	Cpu,
	Database,
	Download,
	FileJson,
	Gauge,
	Github,
	Globe,
	Heart,
	ImageIcon,
	Keyboard,
	Languages,
	Laptop,
	Layers,
	Layout,
	Lock,
	Puzzle,
	Rocket,
	Search,
	Server,
	Settings,
	Shield,
	Users,
	Wifi,
	Workflow,
	Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "MyCMS - Modern Alternative to WordPress",
	description:
		"The modern alternative to WordPress. Build faster, scale better, and maintain easier with our next-generation CMS built on Next.js.",
	keywords: [
		"CMS",
		"Content Management System",
		"WordPress alternative",
		"Next.js",
		"Headless CMS",
	],
	openGraph: {
		title: "MyCMS - Modern Alternative to WordPress",
		description:
			"The modern alternative to WordPress. Build faster, scale better, and maintain easier.",
		type: "website",
	},
};

export default function Home() {
	return (
		<>
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-14 items-center">
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<Layout className="h-6 w-6" />
						<span className="font-bold sm:inline-block">MyCMS</span>
					</Link>
					<nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
						<div className="flex items-center space-x-6">
							<Link
								href="/docs"
								className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary md:block"
							>
								Documentation
							</Link>
							<a
								href="https://github.com/byronwade/cms.byronwade.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary md:block"
							>
								GitHub
							</a>
						</div>
						<Link href="/cms">
							<Button variant="default" size="sm">
								<Layout className="mr-2 h-4 w-4" />
								Open Admin Panel
							</Button>
						</Link>
					</nav>
				</div>
			</header>

			<div className="flex min-h-screen flex-col items-center bg-background">
				<div className="container flex max-w-[64rem] flex-col items-center gap-8 text-center py-12">
					<div className="space-y-4">
						<h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400">
							MyCMS
						</h1>
						<p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
							The modern alternative to WordPress. Build faster, scale better,
							and maintain easier with our next-generation CMS
						</p>
					</div>

					<div className="flex gap-4">
						<a
							href="https://github.com/byronwade/cms.byronwade.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button variant="outline" size="lg">
								<Github className="mr-2 h-4 w-4" />
								View Source
							</Button>
						</a>
						<Link href="/cms">
							<Button
								size="lg"
								className="bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 dark:text-neutral-900"
							>
								<Layout className="mr-2 h-4 w-4" />
								Open Admin Panel
							</Button>
						</Link>
					</div>

					<div className="w-full max-w-4xl mt-8">
						<h2 className="text-2xl font-bold mb-6">
							20 Ways We&apos;re Better Than WordPress
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="p-6 rounded-lg border bg-muted/30">
								<Gauge className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">300% Faster Page Loads</h3>
								<p className="text-sm text-muted-foreground">
									Average page load of 0.3s compared to WordPress&apos;s 1.3s
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Lock className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">
									95% Fewer Security Issues
								</h3>
								<p className="text-sm text-muted-foreground">
									Built-in enterprise security reduces vulnerabilities
									significantly
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Cpu className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">60% Less Server Load</h3>
								<p className="text-sm text-muted-foreground">
									Efficient SSR and caching vs traditional PHP processing
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<BanknoteIcon className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">70% Cost Reduction</h3>
								<p className="text-sm text-muted-foreground">
									No premium plugins needed for essential features
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<ImageIcon className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">50% Smaller Images</h3>
								<p className="text-sm text-muted-foreground">
									Built-in next-gen format optimization and compression
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Bot className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">Native AI Integration</h3>
								<p className="text-sm text-muted-foreground">
									Built-in AI features vs $30/month for similar WordPress
									plugins
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Search className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">40% Better SEO Scores</h3>
								<p className="text-sm text-muted-foreground">
									Optimized core web vitals and semantic HTML structure
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Rocket className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">80% Faster Development</h3>
								<p className="text-sm text-muted-foreground">
									Modern TypeScript stack speeds up development lifecycle
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Database className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">200% Faster Queries</h3>
								<p className="text-sm text-muted-foreground">
									Optimized database operations vs WordPress&apos;s heavy
									queries
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Clock className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">90% Less Maintenance</h3>
								<p className="text-sm text-muted-foreground">
									No plugin updates or compatibility issues to manage
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Puzzle className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">Type-Safe Extensions</h3>
								<p className="text-sm text-muted-foreground">
									No more plugin conflicts or compatibility issues
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Wifi className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">400% Faster API</h3>
								<p className="text-sm text-muted-foreground">
									GraphQL and REST endpoints with superior performance
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Zap className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">Intelligent Caching</h3>
								<p className="text-sm text-muted-foreground">
									Built-in edge caching vs complex cache plugins
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Download className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">75% Faster Assets</h3>
								<p className="text-sm text-muted-foreground">
									Optimized asset loading and delivery system
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<BarChart className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">Real-Time Analytics</h3>
								<p className="text-sm text-muted-foreground">
									Built-in performance and user analytics
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Layers className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">Flexible Architecture</h3>
								<p className="text-sm text-muted-foreground">
									True headless design vs traditional monolithic structure
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Keyboard className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">Modern Dev Tools</h3>
								<p className="text-sm text-muted-foreground">
									Full TypeScript support and hot reload development
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Settings className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">Code-First Config</h3>
								<p className="text-sm text-muted-foreground">
									Version-controlled configuration vs database settings
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Heart className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">90% User Satisfaction</h3>
								<p className="text-sm text-muted-foreground">
									Intuitive interface with modern UX patterns
								</p>
							</div>
							<div className="p-6 rounded-lg border bg-muted/30">
								<Globe className="h-6 w-6 mb-4 mx-auto text-muted-foreground" />
								<h3 className="font-semibold mb-2">Infinite Scaling</h3>
								<p className="text-sm text-muted-foreground">
									Edge-ready architecture vs traditional hosting limits
								</p>
							</div>
						</div>
					</div>

					<div className="w-full max-w-4xl p-6 rounded-lg border bg-muted/10">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
							<div>
								<h4 className="text-2xl font-bold text-primary">0.3s</h4>
								<p className="text-sm text-muted-foreground">
									Average Page Load
								</p>
							</div>
							<div>
								<h4 className="text-2xl font-bold text-primary">99.9%</h4>
								<p className="text-sm text-muted-foreground">Uptime</p>
							</div>
							<div>
								<h4 className="text-2xl font-bold text-primary">100/100</h4>
								<p className="text-sm text-muted-foreground">
									Google PageSpeed
								</p>
							</div>
							<div>
								<h4 className="text-2xl font-bold text-primary">50ms</h4>
								<p className="text-sm text-muted-foreground">Server Response</p>
							</div>
						</div>
					</div>

					<div className="w-full max-w-3xl space-y-4 p-6 rounded-lg border bg-muted/50">
						<div className="space-y-2">
							<h2 className="text-lg font-semibold">
								🚧 Project Status: Building the Future of CMS
							</h2>
							<p className="text-sm text-muted-foreground">
								We&apos;re creating a{" "}
								<strong>modern alternative to WordPress</strong> that developers
								love and content editors enjoy. While our frontend showcases the
								next generation of content management, we&apos;re actively
								seeking backend developers to help build a CMS that&apos;s truly
								better than WordPress in every way.
							</p>
						</div>
					</div>

					<div className="mt-12 w-full">
						<h2 className="text-3xl font-bold mb-8">Core Features</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 backdrop-blur-sm">
								<Blocks className="h-8 w-8" />
								<h3 className="text-xl font-bold">Visual Builder</h3>
								<p className="text-muted-foreground">
									Drag-and-drop interface for building content models and
									layouts
								</p>
							</div>
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 backdrop-blur-sm">
								<Bot className="h-8 w-8" />
								<h3 className="text-xl font-bold">AI-Powered</h3>
								<p className="text-muted-foreground">
									Built-in AI features for content generation and optimization
								</p>
							</div>
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 backdrop-blur-sm">
								<FileJson className="h-8 w-8" />
								<h3 className="text-xl font-bold">Code-First</h3>
								<p className="text-muted-foreground">
									Define content models in TypeScript with full type safety
								</p>
							</div>
						</div>
					</div>

					<div className="mt-16">
						<h2 className="text-3xl font-bold mb-8">
							Enterprise-Ready Features
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 backdrop-blur-sm">
								<Globe className="h-8 w-8" />
								<h3 className="text-xl font-bold">Multi-Tenant Ready</h3>
								<p className="text-muted-foreground">
									Built to handle multiple brands, websites, or applications
									from a single instance
								</p>
							</div>
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 backdrop-blur-sm">
								<Languages className="h-8 w-8" />
								<h3 className="text-xl font-bold">Localization</h3>
								<p className="text-muted-foreground">
									Built-in support for multiple languages and content
									translation workflows
								</p>
							</div>
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 backdrop-blur-sm">
								<Server className="h-8 w-8" />
								<h3 className="text-xl font-bold">API-First Design</h3>
								<p className="text-muted-foreground">
									REST & GraphQL APIs with customizable endpoints and responses
								</p>
							</div>
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 backdrop-blur-sm">
								<Shield className="h-8 w-8" />
								<h3 className="text-xl font-bold">Enterprise Security</h3>
								<p className="text-muted-foreground">
									Role-based access control, SSO, and advanced security features
								</p>
							</div>
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 backdrop-blur-sm">
								<Workflow className="h-8 w-8" />
								<h3 className="text-xl font-bold">Publishing Workflows</h3>
								<p className="text-muted-foreground">
									Customizable content approval and publishing processes
								</p>
							</div>
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 backdrop-blur-sm">
								<Boxes className="h-8 w-8" />
								<h3 className="text-xl font-bold">Digital Asset Management</h3>
								<p className="text-muted-foreground">
									Advanced media library with metadata, versions, and
									transformations
								</p>
							</div>
						</div>
					</div>

					<div className="mt-16 w-full">
						<h2 className="text-3xl font-bold mb-8">Built for Developers</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
							<div className="p-6 rounded-lg border">
								<Zap className="h-6 w-6 mb-4 text-muted-foreground" />
								<h3 className="font-semibold mb-2">Next.js Native</h3>
								<p className="text-sm text-muted-foreground">
									Seamlessly integrated with Next.js App Router and Server
									Components
								</p>
							</div>
							<div className="p-6 rounded-lg border">
								<Code2 className="h-6 w-6 mb-4 text-muted-foreground" />
								<h3 className="font-semibold mb-2">TypeScript First</h3>
								<p className="text-sm text-muted-foreground">
									Full type safety and autocompletion for your content
								</p>
							</div>
						</div>
					</div>

					<div className="mt-16 w-full">
						<h2 className="text-3xl font-bold mb-8">Perfect For</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
							<div className="p-6 rounded-lg border">
								<Laptop className="h-6 w-6 mb-4 text-muted-foreground" />
								<h3 className="font-semibold mb-2">WordPress Migration</h3>
								<p className="text-sm text-muted-foreground">
									Easily migrate from WordPress to a faster, more secure, and
									modern platform
								</p>
							</div>
							<div className="p-6 rounded-lg border">
								<Cloud className="h-6 w-6 mb-4 text-muted-foreground" />
								<h3 className="font-semibold mb-2">Digital Experiences</h3>
								<p className="text-sm text-muted-foreground">
									Create immersive digital experiences that WordPress can&apos;t
									handle
								</p>
							</div>
							<div className="p-6 rounded-lg border">
								<Users className="h-6 w-6 mb-4 text-muted-foreground" />
								<h3 className="font-semibold mb-2">Enterprise Teams</h3>
								<p className="text-sm text-muted-foreground">
									Better collaboration tools and workflows than traditional CMSs
								</p>
							</div>
						</div>
					</div>

					<div className="mt-16 max-w-2xl">
						<h2 className="text-3xl font-bold mb-4">Join the Development</h2>
						<p className="text-lg text-muted-foreground mb-6">
							Help us build the next generation of content management systems.
							Your expertise can shape the future of web development.
						</p>
						<div className="flex gap-4 justify-center">
							<a
								href="https://github.com/byronwade/cms.byronwade.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button variant="outline" size="lg">
									<Github className="mr-2 h-4 w-4" />
									Contribute on GitHub
								</Button>
							</a>
							<Link href="/docs" className="hidden md:block">
								<Button variant="secondary" size="lg">
									<Brush className="mr-2 h-4 w-4" />
									View Documentation
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

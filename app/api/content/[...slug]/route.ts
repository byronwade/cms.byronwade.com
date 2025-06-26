import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Helper function to get the content file path
const getContentPath = (slug: string[]) => {
	return path.join(process.cwd(), "content", ...slug) + ".json";
};

// Helper function to ensure directory exists
async function ensureDirectoryExists(filePath: string) {
	const dir = path.dirname(filePath);
	try {
		await fs.access(dir);
	} catch {
		await fs.mkdir(dir, { recursive: true });
	}
}

// GET handler
export async function GET(request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
	try {
		const { slug } = await params;
		const filePath = getContentPath(slug);
		const content = await fs.readFile(filePath, "utf-8");
		return NextResponse.json(JSON.parse(content));
	} catch (error) {
		// If file doesn't exist, return empty content
		if ((error as NodeJS.ErrnoException).code === "ENOENT") {
			return NextResponse.json({
				content: [],
				metadata: {
					title: "",
					description: "",
					keywords: [],
					author: "",
					publishDate: new Date().toISOString(),
					lastModified: new Date().toISOString(),
					status: "draft",
				},
			});
		}
		return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
	}
}

// POST handler
export async function POST(request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
	try {
		const { slug } = await params;
		const body = await request.json();
		const filePath = getContentPath(slug);
		await ensureDirectoryExists(filePath);
		await fs.writeFile(filePath, JSON.stringify(body, null, 2));
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error saving content:", error);
		return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
	}
}

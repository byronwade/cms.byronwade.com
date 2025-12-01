import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

// Helper function to get the content file path
const getContentPath = (slug: string[]) => {
	return `${path.join(process.cwd(), "content", ...slug)}.json`;
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
export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	try {
		const { slug } = await params;
		const filePath = getContentPath(slug);
		const content = await fs.readFile(filePath, "utf-8");
		const data = JSON.parse(content);

		return NextResponse.json(data, {
			headers: {
				"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
			},
		});
	} catch (error) {
		// If file doesn't exist, return empty content
		if ((error as NodeJS.ErrnoException).code === "ENOENT") {
			return NextResponse.json(
				{
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
				},
				{
					headers: {
						"Cache-Control":
							"public, s-maxage=3600, stale-while-revalidate=86400",
					},
				},
			);
		}
		return NextResponse.json(
			{ error: "Failed to read content" },
			{ status: 500 },
		);
	}
}

// POST handler
export async function POST(
	request: Request,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	try {
		const { slug } = await params;
		const body = await request.json();
		const filePath = getContentPath(slug);
		await ensureDirectoryExists(filePath);
		await fs.writeFile(filePath, JSON.stringify(body, null, 2));

		return NextResponse.json(
			{ success: true },
			{
				headers: {
					"Cache-Control": "no-store",
				},
			},
		);
	} catch (error) {
		console.error("Error saving content:", error);
		return NextResponse.json(
			{ error: "Failed to save content" },
			{ status: 500 },
		);
	}
}

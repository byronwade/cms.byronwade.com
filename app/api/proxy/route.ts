import { NextResponse } from "next/server";

type ResponseHeaders = {
	[key: string]: string;
	"Content-Type": string;
	"Access-Control-Allow-Origin": string;
	"Access-Control-Allow-Methods": string;
	"Access-Control-Allow-Headers": string;
	"Access-Control-Allow-Credentials": string;
} & {
	"Content-Security-Policy"?: string;
	"Cache-Control"?: string;
	"Set-Cookie"?: string;
	"X-Frame-Options"?: string;
};

function resolveUrl(url: string, baseUrl: string): string {
	try {
		return new URL(url, baseUrl).toString();
	} catch {
		return url.startsWith("/") ? baseUrl + url : baseUrl + "/" + url;
	}
}

export async function GET(request: Request) {
	const url = new URL(request.url);
	const targetUrl = url.searchParams.get("url");

	if (!targetUrl) {
		return new NextResponse("Missing url parameter", { status: 400 });
	}

	try {
		const baseUrl = new URL(targetUrl).origin;

		// Forward cookies and headers
		const headers = new Headers({
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"Accept-Language": "en-US,en;q=0.5",
			Connection: "keep-alive",
			"Upgrade-Insecure-Requests": "1",
			Referer: baseUrl,
		});

		// Forward cookies
		const cookie = request.headers.get("cookie");
		if (cookie) {
			headers.set("Cookie", cookie);
		}

		const response = await fetch(targetUrl, { headers });
		const contentType = response.headers.get("content-type") || "text/plain";
		const isHtml = contentType.includes("text/html");

		if (isHtml) {
			let html = await response.text();

			// Fix base URL and resource paths
			html = html
				.replace(/<head>/, `<head><base href="${baseUrl}/">`)
				.replace(/href="\//g, `href="${baseUrl}/`)
				.replace(/src="\//g, `src="${baseUrl}/`)
				.replace(/action="\//g, `action="${baseUrl}/`);

			// Add navigation script
			const navigationScript = `
				<script>
					function initializeNavigation() {
						document.body.style.pointerEvents = 'auto';
						
						// Handle link clicks
						document.addEventListener('click', function(e) {
							const link = e.target.closest('a');
							if (!link || !link.href) return;
							
							try {
								const url = new URL(link.href);
								const baseUrl = '${baseUrl}';
								const isInternal = url.origin === baseUrl || link.getAttribute('href').startsWith('/');
								
								if (isInternal) {
									e.preventDefault();
									e.stopPropagation();
									const fullUrl = resolveUrl(link.href, baseUrl);
									window.parent.postMessage({ type: 'NAVIGATE', url: fullUrl }, '*');
									return false;
								}
							} catch (err) {
								console.error('Navigation error:', err);
							}
						}, true);

						// Handle form submissions
						document.addEventListener('submit', function(e) {
							const form = e.target;
							if (!form || !form.action) return;
							
							try {
								const url = new URL(form.action);
								const baseUrl = '${baseUrl}';
								const isInternal = url.origin === baseUrl || form.action.startsWith('/');
								
								if (isInternal) {
									e.preventDefault();
									e.stopPropagation();
									const formData = new FormData(form);
									const fullUrl = resolveUrl(form.action, baseUrl);
									
									window.parent.postMessage({
										type: 'NAVIGATE',
										url: fullUrl,
										method: form.method,
										data: Object.fromEntries(formData)
									}, '*');
									return false;
								}
							} catch (err) {
								console.error('Form submission error:', err);
							}
						}, true);

						// Disable history API manipulation
						try {
							history.pushState = function() {};
							history.replaceState = function() {};
							window.onpopstate = null;
						} catch (e) {
							console.warn('Could not disable history API:', e);
						}

						window.parent.postMessage({ type: 'PAGE_READY' }, '*');
					}

					function resolveUrl(url, baseUrl) {
						try {
							return new URL(url, baseUrl).toString();
						} catch {
							return url.startsWith('/') ? baseUrl + url : baseUrl + '/' + url;
						}
					}

					// Initialize navigation when the DOM is ready
					if (document.readyState === 'loading') {
						document.addEventListener('DOMContentLoaded', initializeNavigation);
					} else {
						initializeNavigation();
					}
				</script>
			`;

			html = html.replace("</head>", navigationScript + "</head>");

			const responseHeaders: ResponseHeaders = {
				"Content-Type": "text/html",
				"Content-Security-Policy": "default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; font-src * data:; frame-ancestors *;",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "*",
				"Access-Control-Allow-Credentials": "true",
				"X-Frame-Options": "ALLOWALL",
				"Cache-Control": "no-cache",
				"Set-Cookie": "SameSite=None; Secure",
			};

			// Forward cookies
			const responseCookies = response.headers.get("set-cookie");
			if (responseCookies) {
				responseHeaders["Set-Cookie"] = responseCookies;
			}

			return new NextResponse(html, { headers: responseHeaders });
		}

		// For non-HTML resources, proxy them as-is
		const blob = await response.blob();
		const responseHeaders: ResponseHeaders = {
			"Content-Type": contentType,
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Credentials": "true",
			"Cache-Control": "public, max-age=31536000",
		};

		// Forward cookies
		const responseCookies = response.headers.get("set-cookie");
		if (responseCookies) {
			responseHeaders["Set-Cookie"] = responseCookies;
		}

		return new NextResponse(blob, { headers: responseHeaders });
	} catch (error) {
		console.error("Proxy error:", error);
		return new NextResponse("Failed to fetch content", { status: 500 });
	}
}

export async function OPTIONS(_request: Request) {
	return new NextResponse(null, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Max-Age": "86400",
		},
	});
}

export async function POST(request: Request) {
	const url = new URL(request.url);
	const targetUrl = url.searchParams.get("url");

	if (!targetUrl) {
		return new NextResponse("Missing url parameter", { status: 400 });
	}

	try {
		// Forward the request with the same method and body
		const formData = await request.formData();
		const headers = new Headers({
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"Accept-Language": "en-US,en;q=0.5",
			Connection: "keep-alive",
			"Upgrade-Insecure-Requests": "1",
		});

		// Forward cookies
		const cookie = request.headers.get("cookie");
		if (cookie) {
			headers.set("Cookie", cookie);
		}

		const response = await fetch(targetUrl, {
			method: "POST",
			body: formData,
			headers,
		});

		// Handle the response similar to GET
		const contentType = response.headers.get("content-type") || "text/plain";
		const isHtml = contentType.includes("text/html");

		if (isHtml) {
			const html = await response.text();
			const baseUrl = new URL(targetUrl).origin;

			// Modify HTML content
			const modifiedHtml = html
				.replace(/<head>/, `<head><base href="${baseUrl}/">`)
				.replace(/href="\//g, `href="${baseUrl}/`)
				.replace(/src="\//g, `src="${baseUrl}/`)
				.replace(
					"</head>",
					`
					<script>
						// Disable history API manipulation
						history.pushState = function() {};
						history.replaceState = function() {};
						window.onpopstate = null;

						function initializeNavigation() {
							// Enable pointer events
							document.body.style.pointerEvents = 'auto';
							
							// Handle link clicks
							document.addEventListener('click', function(e) {
								const link = e.target.closest('a');
								if (!link) return;

								const href = link.getAttribute('href');
								if (!href) return;

								// Check if it's an internal link
								try {
									// Handle both absolute and relative URLs
									const url = new URL(href, window.location.href);
									const baseUrl = '${baseUrl}';
									const isInternal = url.origin === baseUrl || href.startsWith('/') || !href.includes('://');
									
									if (isInternal) {
										e.preventDefault();
										// Construct the full URL if it's a relative path
										let fullUrl = href;
										if (href.startsWith('http')) {
											fullUrl = href;
										} else if (href.startsWith('/')) {
											fullUrl = baseUrl + href;
										} else {
											fullUrl = baseUrl + '/' + href;
										}
										
										// Send message to parent to update URL
										window.parent.postMessage({
											type: 'NAVIGATE',
											url: fullUrl
										}, '*');
									}
								} catch (err) {
									console.error('Navigation error:', err);
								}
							});

							// Handle form submissions with improved URL handling
							document.addEventListener('submit', function(e) {
								const form = e.target;
								if (!form || !form.action) return;

								try {
									const formUrl = new URL(form.action, window.location.href);
									const baseUrl = '${baseUrl}';
									const isInternal = formUrl.origin === baseUrl || form.action.startsWith('/') || !form.action.includes('://');

									if (isInternal) {
										e.preventDefault();
										const formData = new FormData(form);
										const queryString = new URLSearchParams(formData).toString();
										
										// Construct the full URL
										let fullUrl = form.action;
										if (form.action.startsWith('http')) {
											fullUrl = form.action;
										} else if (form.action.startsWith('/')) {
											fullUrl = baseUrl + form.action;
										} else {
											fullUrl = baseUrl + '/' + form.action;
										}

										const targetUrl = form.method.toLowerCase() === 'get' 
											? fullUrl + (fullUrl.includes('?') ? '&' : '?') + queryString
											: fullUrl;

										// Send message to parent to update URL
										window.parent.postMessage({
											type: 'NAVIGATE',
											url: targetUrl,
											method: form.method,
											data: form.method.toLowerCase() === 'post' ? Object.fromEntries(formData) : null
										}, '*');
									}
								} catch (err) {
									console.error('Form submission error:', err);
								}
							});

							// Notify parent that page is ready
							window.parent.postMessage({ type: 'PAGE_READY' }, '*');
						}

						// Initialize on DOMContentLoaded
						if (document.readyState === 'loading') {
							document.addEventListener('DOMContentLoaded', initializeNavigation);
						} else {
							initializeNavigation();
						}
					</script>
				</head>`
				);

			const responseHeaders: ResponseHeaders = {
				"Content-Type": "text/html",
				"Content-Security-Policy": "default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; font-src * data:; frame-ancestors 'self';",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "*",
				"Access-Control-Allow-Credentials": "true",
				"X-Frame-Options": "SAMEORIGIN",
			};

			// Forward cookies from the response
			const responseCookies = response.headers.get("set-cookie");
			if (responseCookies) {
				responseHeaders["Set-Cookie"] = responseCookies;
			}

			return new NextResponse(modifiedHtml, { headers: responseHeaders });
		}

		// For non-HTML responses, proxy them as-is
		const blob = await response.blob();
		return new NextResponse(blob, {
			headers: {
				"Content-Type": contentType,
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "*",
				"Access-Control-Allow-Credentials": "true",
			},
		});
	} catch (error) {
		console.error("Proxy error:", error);
		return new NextResponse("Failed to fetch content", { status: 500 });
	}
}

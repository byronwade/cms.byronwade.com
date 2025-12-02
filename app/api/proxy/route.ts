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

function _resolveUrl(url: string, baseUrl: string): string {
	try {
		return new URL(url, baseUrl).toString();
	} catch {
		return url.startsWith("/") ? baseUrl + url : `${baseUrl}/${url}`;
	}
}

export async function GET(request: Request) {
	const url = new URL(request.url);
	const targetUrl = url.searchParams.get("url");

	if (!targetUrl) {
		return new NextResponse("Missing url parameter", {
			status: 400,
			headers: {
				"Cache-Control": "no-store",
			},
		});
	}

	try {
		const baseUrl = new URL(targetUrl).origin;

		// Forward cookies and headers
		const headers = new Headers({
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			Accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
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

			// Get the current request origin for the proxy base URL
			const requestOrigin = new URL(request.url).origin;
			const proxyBase = `${requestOrigin}/api/proxy?url=`;

			// Rewrite all URLs that point to the target domain to go through proxy
			// This handles both relative URLs and absolute URLs from the target domain
			const _targetDomainRegex = new RegExp(
				baseUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
				"g",
			);

			// Remove any existing base tags and set a new one pointing to current origin
			html = html.replace(/<base[^>]*>/gi, "");
			// Add base tag pointing to current origin so relative URLs resolve correctly
			html = html.replace(/<head>/i, `<head><base href="${requestOrigin}/">`);

			// Helper function to rewrite a URL to go through proxy
			const rewriteUrl = (url: string): string => {
				if (!url || typeof url !== "string") return url;
				// If it's already a proxy URL (check for both encoded and unencoded), don't rewrite again
				if (url.includes("/api/proxy?url=") || url.includes("%2Fapi%2Fproxy"))
					return url;
				// If it's a relative URL, make it absolute first
				if (url.startsWith("/")) {
					const fullUrl = baseUrl + url;
					return `${proxyBase}${encodeURIComponent(fullUrl)}`;
				}
				// If it's an absolute URL from the target domain, proxy it
				if (url.startsWith(baseUrl)) {
					return `${proxyBase}${encodeURIComponent(url)}`;
				}
				// If it's a protocol-relative URL (//example.com), convert to absolute
				if (url.startsWith("//")) {
					const fullUrl = new URL(url, baseUrl).toString();
					if (fullUrl.startsWith(baseUrl)) {
						return `${proxyBase}${encodeURIComponent(fullUrl)}`;
					}
				}
				// Otherwise, return as-is
				return url;
			};

			// Rewrite relative URLs (starting with /) - handle both double and single quotes
			html = html
				.replace(
					/href=["'](\/[^"']*)["']/g,
					(_match, path) => `href="${rewriteUrl(path)}"`,
				)
				.replace(
					/src=["'](\/[^"']*)["']/g,
					(_match, path) => `src="${rewriteUrl(path)}"`,
				)
				.replace(
					/action=["'](\/[^"']*)["']/g,
					(_match, path) => `action="${rewriteUrl(path)}"`,
				)
				.replace(
					/url\(["']?(\/[^"')]*)["']?\)/g,
					(_match, path) => `url(${rewriteUrl(path)})`,
				);

			// Rewrite absolute URLs from the target domain - handle both double and single quotes
			html = html
				.replace(/href=["'](https?:\/\/[^"']+)["']/g, (_match, url) => {
					return `href="${rewriteUrl(url)}"`;
				})
				.replace(/src=["'](https?:\/\/[^"']+)["']/g, (_match, url) => {
					return `src="${rewriteUrl(url)}"`;
				})
				.replace(/action=["'](https?:\/\/[^"']+)["']/g, (_match, url) => {
					return `action="${rewriteUrl(url)}"`;
				})
				.replace(/url\(["']?(https?:\/\/[^"')]+)["']?\)/g, (_match, url) => {
					return `url(${rewriteUrl(url)})`;
				});

			// Also handle content attribute in meta/link tags and data attributes
			html = html
				.replace(/content=["'](https?:\/\/[^"']+)["']/g, (match, url) => {
					if (url.startsWith(baseUrl)) {
						return `content="${rewriteUrl(url)}"`;
					}
					return match;
				})
				.replace(/data-[^=]+=["'](https?:\/\/[^"']+)["']/g, (match, url) => {
					if (url.startsWith(baseUrl)) {
						return match.replace(url, rewriteUrl(url));
					}
					return match;
				});

			// Add navigation script
			const navigationScript = `
				<script>
					// Fix any remaining URLs that weren't caught by server-side rewriting
					(function() {
						const proxyBase = window.location.origin + '/api/proxy?url=';
						const targetBase = '${baseUrl}';
						
						// Fix URLs in link tags (preload, stylesheet, etc.)
						document.addEventListener('DOMContentLoaded', function() {
							const links = document.querySelectorAll('link[href]');
							links.forEach(link => {
								const href = link.getAttribute('href');
								if (href && (href.startsWith('/') || href.startsWith(targetBase))) {
									if (href.startsWith('/')) {
										link.setAttribute('href', proxyBase + encodeURIComponent(targetBase + href));
									} else if (href.startsWith(targetBase) && !href.includes('/api/proxy')) {
										link.setAttribute('href', proxyBase + encodeURIComponent(href));
									}
								}
							});
							
							// Fix URLs in script tags
							const scripts = document.querySelectorAll('script[src]');
							scripts.forEach(script => {
								const src = script.getAttribute('src');
								if (src && (src.startsWith('/') || src.startsWith(targetBase))) {
									if (src.startsWith('/')) {
										script.setAttribute('src', proxyBase + encodeURIComponent(targetBase + src));
									} else if (src.startsWith(targetBase) && !src.includes('/api/proxy')) {
										script.setAttribute('src', proxyBase + encodeURIComponent(src));
									}
								}
							});
						});
					})();
					
					// Intercept fetch requests and route through proxy
					(function() {
						const originalFetch = window.fetch;
						const proxyBase = window.location.origin + '/api/proxy?url=';
						
						window.fetch = function(...args) {
							const url = args[0];
							if (typeof url === 'string') {
								try {
									const urlObj = new URL(url, window.location.href);
									// Only proxy same-origin or relative URLs
									if (urlObj.origin === '${baseUrl}' || url.startsWith('/')) {
										const fullUrl = url.startsWith('/') 
											? '${baseUrl}' + url 
											: url;
										args[0] = proxyBase + encodeURIComponent(fullUrl);
									}
								} catch (e) {
									// If URL parsing fails, try to proxy if it looks like a relative URL
									if (url.startsWith('/')) {
										args[0] = proxyBase + encodeURIComponent('${baseUrl}' + url);
									}
								}
							}
							return originalFetch.apply(this, args);
						};
						
						// Intercept XMLHttpRequest
						const originalOpen = XMLHttpRequest.prototype.open;
						XMLHttpRequest.prototype.open = function(method, url, ...rest) {
							try {
								const urlObj = new URL(url, window.location.href);
								if (urlObj.origin === '${baseUrl}' || url.startsWith('/')) {
									const fullUrl = url.startsWith('/') 
										? '${baseUrl}' + url 
										: url;
									url = proxyBase + encodeURIComponent(fullUrl);
								}
							} catch (e) {
								if (url.startsWith('/')) {
									url = proxyBase + encodeURIComponent('${baseUrl}' + url);
								}
							}
							return originalOpen.call(this, method, url, ...rest);
						};
					})();
					
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

			html = html.replace("</head>", `${navigationScript}</head>`);

			const responseHeaders: ResponseHeaders = {
				"Content-Type": "text/html",
				"Content-Security-Policy":
					"default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; font-src * data:; frame-ancestors *;",
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
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			Accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
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
				</head>`,
				);

			const responseHeaders: ResponseHeaders = {
				"Content-Type": "text/html",
				"Content-Security-Policy":
					"default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; font-src * data:; frame-ancestors 'self';",
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

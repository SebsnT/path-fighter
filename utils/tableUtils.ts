// Function to convert markdown-like links to HTML anchor tags
export function convertMarkdownToLinks(
  markdown: string,
  baseUrl: string,
): string {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
    return `${text} <a href="${baseUrl}${url}" target="_blank"> #</a>`;
  });
}

export function addLinkToName(
  name: string,
  url: string,
  baseUrl: string,
): string {
  return `${name} <a href="${baseUrl}${url}" target="_blank"> #</a>`;
}

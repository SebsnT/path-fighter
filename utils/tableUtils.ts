// Function to convert markdown-like links to HTML anchor tags
export function convertMarkdownToLinks(
  markdown: string,
  baseUrl: string,
): string {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
    return `<a href="${baseUrl}${url}" target="_blank">${text}</a>`;
  });
}

export function addLinkToName(
  name: string,
  url: string,
  baseUrl: string,
): string {
  return `<a href="${baseUrl}${url}" target="_blank">${name}</a>`;
}

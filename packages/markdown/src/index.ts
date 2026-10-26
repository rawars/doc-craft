import MarkdownIt from 'markdown-it';

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true });
const defaultFence = markdown.renderer.rules.fence!;
markdown.renderer.rules.fence = (tokens, index, options, env, self) => {
  const token = tokens[index];
  if (token.info.trim().split(/\s+/)[0] === 'mermaid') {
    return `<pre class="mermaid">${escapeHtml(token.content)}</pre>`;
  }
  return defaultFence(tokens, index, options, env, self);
};

export function renderDocument(source: string, language: 'markdown' | 'mermaid' = 'markdown'): string {
  return language === 'mermaid'
    ? `<pre class="mermaid">${escapeHtml(source)}</pre>`
    : markdown.render(source);
}

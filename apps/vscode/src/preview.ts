import mermaid from 'mermaid';

async function render(): Promise<void> {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: document.body.classList.contains('vscode-dark') || document.body.classList.contains('vscode-high-contrast') ? 'dark' : 'default'
  });
  for (const [index, element] of Array.from(document.querySelectorAll<HTMLElement>('.mermaid')).entries()) {
    const source = element.textContent ?? '';
    try {
      const { svg } = await mermaid.render(`diagram-${index}`, source);
      element.innerHTML = svg;
    } catch {
      document.getElementById(`ddiagram-${index}`)?.remove();
      element.className = 'diagram-error';
      element.textContent = `No se pudo renderizar el diagrama Mermaid. Revisa la sintaxis.\n\n${source}`;
    }
  }
}
void render();

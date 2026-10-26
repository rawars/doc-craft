import * as vscode from 'vscode';
import { randomBytes } from 'node:crypto';
import { renderDocument } from '@doc-craft/markdown';

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(vscode.commands.registerCommand('docCraft.openPreview', () => {
    const document = vscode.window.activeTextEditor?.document;
    if (!document || !/\.(md|markdown|mmd|mermaid)$/i.test(document.uri.path)) {
      void vscode.window.showInformationMessage('Abre un archivo Markdown (.md) o Mermaid (.mmd, .mermaid).');
      return;
    }
    const panel = vscode.window.createWebviewPanel('docCraft.preview', `Doc Craft: ${document.uri.path.split('/').pop()}`, vscode.ViewColumn.Beside, {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'dist'), vscode.Uri.joinPath(document.uri, '..')]
    });
    const update = () => {
      const nonce = randomBytes(16).toString('hex');
      const script = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'dist', 'preview.js'));
      const base = panel.webview.asWebviewUri(vscode.Uri.joinPath(document.uri, '..')).toString() + '/';
      const language = /\.(mmd|mermaid)$/i.test(document.uri.path) ? 'mermaid' : 'markdown';
      panel.webview.html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${panel.webview.cspSource} https: data:; font-src ${panel.webview.cspSource}; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
        <base href="${base}">
        <style>
          body { color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); font: 16px/1.65 var(--vscode-font-family); padding: 24px; }
          main { max-width: 960px; margin: auto; overflow-wrap: anywhere; }
          pre { padding: 16px; background: var(--vscode-textCodeBlock-background); overflow: auto; border-radius: 6px; }
          code { font-family: var(--vscode-editor-font-family); }
          img, svg { max-width: 100%; } a { color: var(--vscode-textLink-foreground); }
          table { border-collapse: collapse; } td, th { border: 1px solid var(--vscode-panel-border); padding: 6px 12px; }
          blockquote { border-left: 3px solid var(--vscode-textBlockQuote-border); margin-left: 0; padding-left: 16px; }
          .diagram-error { white-space: pre-wrap; color: var(--vscode-errorForeground); }
        </style></head><body><main>${renderDocument(document.getText(), language)}</main><script nonce="${nonce}" src="${script}"></script></body></html>`;
    };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const changes = vscode.workspace.onDidChangeTextDocument(event => {
      if (event.document.uri.toString() !== document.uri.toString()) return;
      clearTimeout(timer);
      timer = setTimeout(update, 200);
    });
    panel.onDidDispose(() => { clearTimeout(timer); changes.dispose(); });
    update();
  }));
}

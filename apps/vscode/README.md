# Doc Craft para VS Code

Vista previa en vivo de Markdown y diagramas Mermaid, sin depender de un CDN.

## Instalación

1. [Descarga el instalador de Doc Craft v0.1.0](https://github.com/rawars/doc-craft/releases/download/v0.1.0/doc-craft-vscode-0.1.0.vsix).
2. En VS Code 1.96 o superior, abre la paleta con **⌘⇧P** (macOS) o **Ctrl+Shift+P** (Windows/Linux).
3. Ejecuta **Extensions: Install from VSIX…** y selecciona el archivo descargado.
4. Recarga VS Code si lo solicita.

No necesitas Node.js, pnpm ni compilar el proyecto.

## Uso

1. Abre un archivo `.md`, `.markdown`, `.mmd` o `.mermaid`.
2. Ejecuta **Doc Craft: Abrir vista previa** desde la paleta de comandos o el botón de la barra del editor.
3. Edita el documento: la vista previa se actualiza automáticamente.

Soporta encabezados, tablas, listas, enlaces, imágenes relativas y bloques de código. Para incluir un diagrama en Markdown:

````md
```mermaid
flowchart LR
  Documento --> VistaPrevia
```
````

Los archivos `.mmd` y `.mermaid` se interpretan como diagramas completos. Los errores de sintaxis aparecen junto al código del diagrama. El HTML crudo está deshabilitado y Mermaid usa el modo `strict`.

Esta versión inicial no incluye edición visual, exportación ni sincronización de desplazamiento.

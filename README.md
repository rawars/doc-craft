# Doc Craft

Monorepo con pnpm y TypeScript para herramientas de documentación.

## Requisitos

Node.js 22 o superior y pnpm 12.4.2.

## Desarrollo

```sh
pnpm install
pnpm check
pnpm test
pnpm build
```

Abre esta carpeta en VS Code y presiona **F5** con la configuración **Doc Craft: extensión**. En la ventana de desarrollo, abre `examples/demo.md` o `examples/diagram.mmd` y ejecuta **Doc Craft: Abrir vista previa** desde la paleta de comandos. También puedes usar el botón de vista previa en la barra del editor.

La vista previa queda vinculada al documento abierto y se actualiza mientras escribes. Soporta Markdown, tablas, bloques de código y diagramas Mermaid, tanto en bloques `mermaid` como en archivos `.mmd` y `.mermaid`. Las imágenes relativas se resuelven desde la carpeta del documento. Los recursos de Mermaid se incluyen en la extensión, sin CDN.

Para recompilar automáticamente durante el desarrollo:

```sh
pnpm dev
```

Después de cambiar el código de la extensión, recarga la ventana de desarrollo.

## Estructura

- `apps/vscode`: extensión de VS Code y scripts de compilación/empaquetado.
- `packages/markdown`: renderizador compartido de Markdown y pruebas.
- `examples`: documentos para probar la vista previa.

## Empaquetar

```sh
pnpm package:extension
```

Genera un `.vsix` dentro de `apps/vscode`. Instálalo desde **Extensions: Install from VSIX…**. El campo `publisher` es provisional; debe sustituirse por un publisher propio antes de publicar en Marketplace.

## Alcance inicial

Esta versión ofrece lectura y vista previa. No incluye edición visual, exportación a PDF ni sincronización de desplazamiento. El HTML crudo está deshabilitado y Mermaid utiliza el modo `strict`.

Referencias: [Webview API de VS Code](https://code.visualstudio.com/api/extension-guides/webview) y [Mermaid](https://mermaid.js.org/config/usage.html).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderDocument } from './index.js';

test('renders headings and tables', () => {
  assert.match(renderDocument('# Hola'), /<h1>Hola<\/h1>/);
  assert.match(renderDocument('| A | B |\n|---|---|\n| 1 | 2 |'), /<table>/);
});
test('escapes raw HTML and unsafe links', () => {
  assert.doesNotMatch(renderDocument('<script>alert(1)</script>'), /<script>/);
  assert.doesNotMatch(renderDocument('[x](javascript:alert(1))'), /href="javascript:/);
});
test('renders Mermaid fences and standalone files without interpreting HTML', () => {
  assert.match(renderDocument('```mermaid\ngraph TD\n A-->B\n```'), /class="mermaid"/);
  assert.equal(renderDocument('<script>', 'mermaid'), '<pre class="mermaid">&lt;script&gt;</pre>');
  assert.match(renderDocument('```ts\nconst a = 1\n```'), /class="language-ts"/);
});

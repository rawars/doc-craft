import * as esbuild from 'esbuild';
const watch = process.argv.includes('--watch');
const configs = [
  { entryPoints: ['src/extension.ts'], outfile: 'dist/extension.cjs', bundle: true, platform: 'node', format: 'cjs', external: ['vscode'], target: 'node20' },
  { entryPoints: ['src/preview.ts'], outfile: 'dist/preview.js', bundle: true, platform: 'browser', format: 'iife', target: 'es2022' }
];
for (const config of configs) {
  if (watch) { const ctx = await esbuild.context(config); await ctx.watch(); }
  else await esbuild.build({ ...config, minify: true });
}

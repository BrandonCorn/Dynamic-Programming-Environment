import * as esbuild from 'esbuild-wasm';
import { fetchPlugin } from "../unpkgPlugins/plugins/fetchPlugin";
import { unpkgPathPlugin } from "../unpkgPlugins/plugins/unpkgPlugin";

let service = false;

export default async (code: string) => {
  if (service) return;
  //initialize esbuild if not done so
  await esbuild.initialize({
    worker: true,
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.8/esbuild.wasm'
  });
  service = true;

  //grab the result of bundling code from user input
  const result = await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins:[
      unpkgPathPlugin(code),
      fetchPlugin(code),
    ],
    define: {
      'process.env.NODE_ENV': "'production'",
      global: 'window',
    }
  });

  return result.outputFiles[0].text;
}
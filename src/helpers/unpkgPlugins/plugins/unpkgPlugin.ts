import * as esbuild from 'esbuild-wasm';

const unpkgPath = 'https://unpkg.com';
     
export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

      //handle root file index.js
      build.onResolve({filter: /(^index\.js$)/}, () => {
        return {
          namespace: 'a',
          path: 'index.js',
        }
      });
      //handle relative paths
      build.onResolve({filter: /^\.+\//}, (args: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: new URL(args.path, `${unpkgPath + args.resolveDir}/`).href
        }
      })

      //handle main file
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: `${unpkgPath}/${args.path}`
        }
      });
    },
  };
};
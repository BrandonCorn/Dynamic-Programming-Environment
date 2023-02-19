import * as esbuild from 'esbuild-wasm';
import localForage from '../../localForage';
import axios from 'axios';

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild){

    build.onLoad({ filter: /^index\.js$/}, async (args: esbuild.OnLoadArgs) => {
      const cachedResult = await localForage.getItem<esbuild.OnLoadResult>(args.path);
      if (cachedResult){
        return cachedResult;
      }
      return {
        loader: 'jsx',
        contents: inputCode,
      };
    });

  build.onLoad({ filter: /.*/}, async (args: esbuild.OnLoadArgs) => {
    const cachedResult = await localForage.getItem<esbuild.OnLoadResult>(args.path);
    if (cachedResult){
      return cachedResult;
    }
  })

    build.onLoad({ filter: /.css$/}, async (args: esbuild.OnLoadArgs) => {
      const { data, request } = await axios.get(args.path);

      const escaped = data
        .replace(/\n/g, '')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'");

      //store data because not stored yet
      const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;


      const dataResult: esbuild.OnLoadResult = {
        loader: 'jsx',
        contents,
        resolveDir: new URL('./', request.responseURL).pathname,
      }

      await localForage.setItem(args.path, dataResult);
      return dataResult;

    })
    
    
    build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {  
      const { data, request } = await axios.get(args.path);

      const dataResult: esbuild.OnLoadResult = {
        loader: 'jsx',
        contents: data,
        resolveDir: new URL('./', request.responseURL).pathname,
      }

      await localForage.setItem(args.path, dataResult);
      return dataResult;
    });
    }
  }
}
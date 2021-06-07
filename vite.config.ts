import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import buildDefines from './build-plugins/buildDefines'
import aliases from './build-plugins/generateAliases'
import replace from './build-plugins/rollup/replace-files'

import metadata from './build-plugins/rollup/metadata'
import getThemeDefines from './build-plugins/getThemeDefines'

import fs from 'fs'

/**
 * https://vitejs.dev/config/
 */
export default defineConfig((async () => {
  const replacements = await aliases(__dirname);

  return {
    build: {
      outDir: 'build',
    },
    plugins: [
      reactRefresh(),
      metadata(),
      // {
      //   name: 'testing',
      //   resolveDynamicImport: (specifier, importer) => {
      //     console.log({ specifier, importer });

      //     return null;
      //   },
      // },
      // {
      //   name: 'testing',
      //   async buildStart() {
      //     const resolution = await this.resolve('foo', undefined, {
      //       custom: { resolving: { specialResolution: true } }
      //     });
      //     console.log(resolution.id);
      //   }
      // },
      {
        name: 'testing',
        resolveId: (source, importer, options) => {
          console.log(source);

          const foundReplace = replacements.find((replacement) => replacement.find === source);

          if (foundReplace) {
            console.info(`replace "${foundReplace.find}" with "${foundReplace.replacement}"`);

            try {
              // return new file content
              return {
                id: foundReplace.replacement,
              };
            } catch (err) {
              console.error(err);

              return null;
            }
          }

          return null;
        },
      },
      // replace(replacements), // doesn't resolve further imports correctly
    ],

    define: {
      ...buildDefines(),
      ...getThemeDefines(),
    },
  };
})())

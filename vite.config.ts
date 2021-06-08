import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import buildDefines from './build-plugins/buildDefines'
import aliases from './build-plugins/generateAliases'
import replace from './build-plugins/rollup/replace-files'

import metadata from './build-plugins/rollup/metadata'
import getThemeDefines from './build-plugins/getThemeDefines'

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
         replace(replacements), // doesn't resolve further imports correctly
      ],

      define: {
         ...buildDefines(),
         ...getThemeDefines(),
      },

      resolve: {
         alias: {
            "$core": "src"
         },
      },
   };
})())

import fs from 'fs'

/**
 * @function replaceFiles
 * @param {({find: string, replacement: string})[]} replacements
 */
export default function replaceFiles(replacements) {
   if (!replacements?.length) {
      return null;
   }

   return {
      name: 'rollup-plugin-replace-files',
      load: async (id) => {
         const foundReplace = replacements.find((replacement) => replacement.find === id);

         if (foundReplace) {
            console.info(`replace "${foundReplace.find}" with "${foundReplace.replacement}"`);

            try {
               const code = fs.readFileSync(foundReplace.replacement, 'utf8');

               // return new file content
               return {
                  code,
               };
            } catch (err) {
               console.error(err);

               return null;
            }
         }

         return null;
      }
   }
}
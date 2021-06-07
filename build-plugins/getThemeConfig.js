import dotenv from 'dotenv';

export default function getThemeConfig() {
   const usedTheme = dotenv.config().parsed.THEME;
   return import(`./src/themes/${usedTheme}/config.mjs`);
}
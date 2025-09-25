const path = require('path');
const baseConfig = require('pandasuite-bridge/tailwind.config');

module.exports = {
  ...baseConfig,
  content: [
    ...(baseConfig.content || []),
    path.join(__dirname, 'src/**/*.{js,jsx,ts,tsx}'),
    path.join(__dirname, 'dist/**/*.{js,jsx,ts,tsx,mjs,cjs}'),
  ],
};

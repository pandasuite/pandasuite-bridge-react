const bridgeConfig = require('pandasuite-bridge/tailwind.config');

bridgeConfig.purge.push('./node_modules/pandasuite-bridge-react/src/**/*.{js,jsx,ts,tsx}');

module.exports = bridgeConfig;

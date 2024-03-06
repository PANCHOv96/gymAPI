const {defaults} = require('jest-config');

const config = {
    verbose: true,
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
  };
  
  module.exports = config;
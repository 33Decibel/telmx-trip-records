const path = require('path');
const changeBuildDirectory = require('craco-change-build-directory');

const newBuildPath = path.resolve('html');

module.exports = {
  webpack: {
    alias: {
      '@logger': path.resolve(__dirname, 'src/helpers/logger'),
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@common': path.resolve(__dirname, 'src/common'),
    },
  },
  plugins: [
    {
      plugin: changeBuildDirectory,
      options: {
        newPath: newBuildPath,
      },
    },
  ],
};

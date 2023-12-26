// Example next.config.js for CSS modules
module.exports = {
    // Your other configurations...
    cssModules: true,
    webpack(config) {
        console.log('Building with config:', config);
        return config;
      },
  };
  
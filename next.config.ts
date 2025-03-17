export default {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.resolve.modules.push(__dirname + '/src');
    return config;
  },
};

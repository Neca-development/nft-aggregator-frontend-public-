const { aliasWebpack } = require("react-app-alias");

module.exports = config => {
  config.module.rules[1].oneOf.splice(0, 0, {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ["@svgr/webpack"],
  });
  aliasWebpack({})(config);
  return config;
};

const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@constants": path.resolve(__dirname, "src/constants/"),
      "@store": path.resolve(__dirname, "src/store.js"),
      "@actions": path.resolve(__dirname, "src/actions.js"),
    },
  },
};

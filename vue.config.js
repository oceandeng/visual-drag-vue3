const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 3000,
    },
    chainWebpack: (config) => {
        config.resolve.alias.set("@", resolve("src")).set("@styles", resolve("src/assets/styles"));
    },
});

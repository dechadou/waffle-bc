const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: {
    autoprefixer: {},
    purgecss: process.env.NODE_ENV === "production" ? {
        content: [
            "./src/**/*.html", 
            "./src/**/*.vue"
        ]
    } : "",
  },
};

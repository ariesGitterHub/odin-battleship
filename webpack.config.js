const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point for the application
  output: {
    filename: "bundle.js", // Output file
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match all JavaScript files
        exclude: /node_modules/, // Exclude node_modules from being transpiled
        use: "babel-loader", // Use Babel to transpile the files
      },
    ],
  },
  devtool: "source-map", // Enable source maps for debugging
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};

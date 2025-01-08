import path from "path";

export default {
  entry: "./src/index.js", // Adjust to the entry file of your project
  output: {
    path: path.resolve("dist"), // The output directory
    filename: "bundle.js", // The output file name
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Babel will transpile JS files
        exclude: /node_modules/, // Don't transpile node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // You can add other presets here if needed
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"], // This allows you to import files without extensions
  },
  devServer: {
    static: "./dist", // Serve from the dist folder
    port: 9000, // You can adjust the port
    hot: true, // Enable hot module replacement for development
  },
};

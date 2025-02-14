import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin"; // Import html-webpack-plugin using ES module syntax

// Get the current directory path in ES Module context
const __dirname = path.dirname(new URL(import.meta.url).pathname);
 
export default {
  entry: "./src/index.js", // Adjust to the entry file of your project
  output: {
    path: path.resolve("dist"), // The output directory
    filename: "bundle.js", // The output file name
  },
  mode: "development", // Add this line to specify the development mode
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
      {
        test: /\.(mp3)$/, // Match MP3 files
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[hash].[ext]", // Output path and filename format
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource", // This will handle the SVG as an asset
        generator: {
          filename: "images/[contenthash][ext]", // Output location and naming
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // Injects CSS into the DOM
          "css-loader", // Resolves @import and url() in CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"], // This allows you to import files without extensions
  },
  devServer: {
    static: path.resolve(__dirname, "dist"), // Serve from the dist folder
    port: 9000, // You can adjust the port
    open: true, // Automatically open the browser when the server starts
    hot: true, // Enable hot module replacement for development
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Path to your source HTML file
      filename: "index.html", // Output filename (dist/index.html)
    }),
  ],
};

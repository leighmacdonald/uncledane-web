const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
        path: path.join(__dirname, '/dist/static'),
        publicPath: "/static/",
        filename: '[name].bundle.js',
        clean: true,
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {loader: "ts-loader"},
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    // Creates `style` nodes from JS strings
                    // process.env.NODE_ENV !== "production"
                    //     ? "style-loader"
                    //     : MiniCssExtractPlugin.loader,
                    // // Translates CSS into CommonJS
                    "css-loader",
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.(webm|mp3|webmanifest|zip)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                },
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg|webp|ico)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                },
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/index.html", to: "index.html" },
            ],
        }),
        // new MiniCssExtractPlugin({
        //     filename: "index.css",
        //     chunkFilename: "index.css",
        // }),
    ],
}

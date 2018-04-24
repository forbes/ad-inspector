var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ad-inspector.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/(node_modules)/, path.resolve(__dirname, 'src/background.js')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    }
};

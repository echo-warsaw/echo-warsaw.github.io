const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
	entry: './js/es6/main.js',
	output: { path: __dirname, filename: './js/main.min.js' },
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query:
				{
					presets: [ 'es2015', 'react' ]
				}
			}
		]
	},
	devServer: {
        proxy: {'/api': {target: 'http://127.0.0.1:8001', secure: false, changeOrigin: true}},
				contentBase: './',
        hot: true,
        inline: true,
        port: 8080,
        historyApiFallback: true
  }
};

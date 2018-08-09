const path = require('path'); 



const config = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
  entry: ['babel-polyfill',path.join(__dirname, '/src/index.js')], 
  output: { 
    path: path.join(__dirname, './public/'), 
    filename: 'bundle.js' 
  },
  
  module: { 
    
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader' 
      },
      {
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 1024,
							name: 'images/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'application/font-woff',
							name:'fonts/[name].[ext]'
						}
					}
					
				]
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'file-loader',
						options:{
							name:'fonts/[name].[ext]'
						}
					}
				]
			}
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};


module.exports = config;
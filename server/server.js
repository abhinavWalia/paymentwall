import express from 'express'
import webpack from 'webpack'
import path from 'path'
import config from '../webpack.config';
import open from 'open';
import {
	choosePort,
  } from 'react-dev-utils/WebpackDevServerUtils';



const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const app = express();


const compiler = webpack(config)

app.use(
	require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
	}),
)

app.use(require('webpack-hot-middleware')(compiler))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

choosePort(HOST, DEFAULT_PORT)
  .then(port => {
		if (port == null) {
		// We have not found a port.
		return;
		}
		app.listen(port, err => {
			if (err) {
				console.log(err)
			} else {
			    open(`http://localhost:${port}`)
			}
		})
     }) 




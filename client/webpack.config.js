const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/app.js', // Cambia esto a la ruta de tu archivo principal de React
  output: {
    path: path.resolve(__dirname, '../.dist/client'), // Cambia esto a la ruta de salida deseada en tu proyecto
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../public'), // Cambia esto a la ruta de tus archivos estáticos
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

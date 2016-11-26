module.exports = {
  context: `${__dirname}/src`,
  entry: {
    bundle: './index',
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/build`,
    filename: '[name].min.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
      },
      {
        test: /\.css$/,
        loader: 'style!css?',
      },
    ],
  },
};
0

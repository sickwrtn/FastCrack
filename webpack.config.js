const path = require('path');

module.exports = {
  entry: './source/index.ts', // content_scripts의 진입점 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들된 파일이 저장될 경로
    filename: 'index.js', // 번들된 파일 이름
  },
  resolve: {
    extensions: ['.ts', '.js'], // TypeScript 파일 확장자 추가
  },
  module: {
    rules: [
        {test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader'},
    ],
  },
};
const path = require('path'); // утилита для превращения относительного пути в абсолютный
const HtmlWebpackPlugin = require('html-webpack-plugin'); // плагин html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // плагин, который чистит папку dist
// перед очередной сборкой
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // плагин, который объединяет 
// много css файлов в один

module.exports = {
    entry: { // точка входа (откуда брать index.js)
        main: './src/pages/index.js'
    },
    output: { // точка выхода (название и место финального фала .js)
        path: path.resolve(__dirname, 'dist'), // два аргумента: ссылка на 
        //текущую папку __dirname и относительный путь к точке выхода.
        filename: 'main.js',
    },
    mode: 'development', // включаем режим разработчика
    devServer: { // настройки локального сервера
        static: {
            directory: path.join(__dirname, 'dist'), // путь, куда "смотрит" режим разработчика
        },
        compress: true, // это ускоряет загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true // сайт будет открываться cам при запуске
    },
    module: {
        rules: [ // rules — это массив правил 
          // добавим в него объект правил для бабеля
          {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            use: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/'
          },
          {
            // регулярное выражение, которое ищет все файлы с такими расширениями
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource' // переносит файлы в том же формате
          },
          {
            // применять это правило только к CSS-файлам
            test: /\.css$/,
            // при обработке этих файлов нужно использовать
            // MiniCssExtractPlugin.loader и css-loader
            use: [MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
              'postcss-loader']
          }
          ]
      },
    plugins: [
          new HtmlWebpackPlugin({ // класс плагина html
            template: './src/index.html'
      }),
      new CleanWebpackPlugin(), // класс плагина для чистки dist
      new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ]
}
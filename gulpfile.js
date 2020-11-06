const gulp = require('gulp');
const stream = require('webpack-stream');
const webpack = require("webpack");
const conf = require('./webpack.config');
// const server = require('./server');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const sass = require('gulp-sass');
const postcss      = require('gulp-postcss');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano      = require('gulp-cssnano');
const gutil        = require('gutil');

gulp.task('scss', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/css'));
});

gulp.task('css:minify', function () {
    return gulp.src('css/**/*.css')
        .pipe(cssnano())
        .pipe(postcss([ autoprefixer({ browsers: ['ie >= 9', 'last 4 versions', '> 1%'] }) ]))
        .pipe(gulp.dest('css'));
});
gulp.task('watcher', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
});

gulp.task('build', function() {
    return gulp.src('src/index.js')
        .pipe(stream(conf))
        .pipe(gulp.dest('public/'));
});

gulp.task('dev', function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(conf);
    var compiler = webpack(conf);
    if (!global._babelPolyfill) {
        require('babel-polyfill');
    }
    new WebpackDevServer(webpack(

        {
            entry: ['babel-polyfill', './src/index.js'],
            output:{
                path: __dirname+ '/public/',
                publicPath: '/',
                filename: 'bundle.js'
            },
            module:{
                rules:[
                    {
                        test: /\.(js|jsx?$)/,
                        loader: "babel-loader",
                        exclude: /(node_modules)/,
                        options:{
                            presets:["@babel/preset-env", "@babel/preset-react"]
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader'
                        ]
                    }
                ]
            },
            mode: 'development',
            resolve: {
                extensions: ['.js', '.jsx']
            },
            plugins: [new HtmlWebPackPlugin({
                template: "./src/index.html",
                inject: false,
                hash: true
            })]

        }
    ), {
        publicPath: "" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(9090, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:9090/webpack-dev-server/index.html");
    });
});

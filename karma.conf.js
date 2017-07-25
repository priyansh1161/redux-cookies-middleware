const path = require('path');
const webpack = require('karma-webpack');

const webpackConfig = {
    entry: './test/index.spec',
    output: {
        path: path.resolve(__dirname, 'temp'),
        filename: 'index.js',
        publicPath: '/',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
            options: {
                presets: ['react', 'es2015', 'stage-0']
            }
        }]
    },
    plugins: [],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    },
    devtool: 'inline-source-map',
    context: __dirname,
    target: 'web'
};

module.exports = function(config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            'src/**/*',
            'test/**/*'
        ],
        exclude: [],
        preprocessors: {
            'src/**/*': ['webpack', 'sourcemap', 'coverage'],
            'test/**/*': ['webpack', 'sourcemap']
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        webpack: webpackConfig,
        plugins: [
            webpack,
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        // start these browsers
        // Chrome PhantomJS
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    });
}
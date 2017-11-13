var path = require("path")

var buildModule = require("build-modules")

var buildDirectory = path.join(__dirname,'dist')
var generatedTestDirectory = path.join(__dirname,'test/generated')

var copywrite = '/* Copyright (c) 2013 Billy Tetrud - Free to use for any purpose: MIT License*/'

console.log('building and minifying...')
var name = 'rpep'
build(name, false, {output: {path:buildDirectory}, header: copywrite, name:name, minify:true})
build(name, true, {output: {path:buildDirectory, name:name+'-dev.umd.js'}, header: copywrite, name:name, minify:false})

// tests
name = 'test.browser'
build('./test/'+name, true, {output: {path:generatedTestDirectory, name:name+'.umd.js'}, header: copywrite, name:name, minify:false})


function build(relativeModulePath, watch, options) {
    var emitter = buildModule(path.join(__dirname, '.', relativeModulePath), {
        watch: watch/*, header: copyright*/, name: options.name, minify: options.minify,
        module: {
            rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: [{
                loader: 'nodent-loader',
                options: {
                  promises: true,
                  wrapAwait: true
                }
               }
              ]
            }
          ]
        },
        output: options.output
    })
    emitter.on('done', function() {
       console.log((new Date())+" - Done building "+relativeModulePath+"!")
    })
    emitter.on('error', function(e) {
       console.log(e)
    })
    emitter.on('warning', function(w) {
       console.log(w)
    })
}

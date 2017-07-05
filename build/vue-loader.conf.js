var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var px2rem = require('postcss-px2rem');
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
 	 	px2rem({remUnit: 60}),
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    })
		
  ]
}

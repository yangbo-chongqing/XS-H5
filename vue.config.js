// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
	// 基准大小 baseSize，需要和rem.js中相同
	remUnit: 16
})

module.exports = {
	publicPath: './',
	outputDir: process.env.outputDir,
	devServer: {
		proxy: {
			'/': {
				// target: 'http://10.70.148.237/api', //wei
				target: 'https://xsdt.xunsheng.org.cn', //wei
				changeOrigin: true
			}
		}
	},
	lintOnSave: true,
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					postcss
				]
			}
		}
	}
}

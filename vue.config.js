module.exports = {
    lintOnSave: false,
    publicPath: './',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 12.5, // 新版本的是这个值
                        mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
                        exclude: /(node_module)/,
                    }),
                ]
            }
        }
    },
    configureWebpack: {
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js', //内部为正则表达式  vue结尾的
            'assets': '@/assets',
            'common': '@/common',
            'components': '@/components',
            'network': '@/network',
            'views': '@/views',
            'pages':'@/pages'
        }
    }
}
}
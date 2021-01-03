const autoprefixer = require('autoprefixer');
const postcssPxtorem = require('postcss-pxtorem');

module.exports = {
    plugins: [
        autoprefixer({

        }),
        postcssPxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
        })
    ]
};

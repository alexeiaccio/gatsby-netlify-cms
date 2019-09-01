const Typograf = require('typograf')

exports.tp = new Typograf({ locale: ['ru', 'en-US'] })
tp.enableRule('common/html/url')
tp.disableRule('common/nbsp/afterShortWord')
tp.disableRule('ru/punctuation/ano')

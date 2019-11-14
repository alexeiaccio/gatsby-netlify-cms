const PrismicDOM = require('prismic-dom')
const tp = require('./tp')

exports.linkResolver = () => doc => doc.slug

const { Elements } = PrismicDOM.RichText

exports.htmlSerializer = () => (type, element, content, children) => {
  switch (type) {
    case Elements.heading1:
      return `<h1>${tp.execute(children.join(''))}</h1>`
    case Elements.heading2:
      return `<h2>${tp.execute(children.join(''))}</h2>`
    case Elements.heading3:
      return `<h3>${tp.execute(children.join(''))}</h3>`
    case Elements.heading4:
      return `<h4>${tp.execute(children.join(''))}</h4>`
    case Elements.heading5:
      return `<h5>${tp.execute(children.join(''))}</h5>`
    case Elements.heading6:
      return `<h6>${tp.execute(children.join(''))}</h6>`
    case Elements.paragraph:
      return `<p>${tp.execute(children.join(''))}</p>`
    case Elements.listItem:
      return `<li>${tp.execute(children.join(''))}</li>`
    case Elements.oListItem:
      return `<li>${tp.execute(children.join(''))}</li>`
    case Elements.list:
      return `<ul>${children.join('')}</ul>`
    case Elements.oList:
      return `<ol>${tp.execute(children.join(''))}</ol>`
    case Elements.hyperlink:
      // eslint-disable-next-line
      const target = element.data.target
        ? `target="${element.data.target}" rel="noopener noreferrer"`
        : ''
      if (element.data.type === 'reference') {
        return `<span class="reference" data-type="reference" data-href=${content}>${content}</span>`
      } else if (element.data.link_type === 'Document') {
        return `<a class="link" ${target} href="/${
          element.data.slug
        }">${content}</a>`
      }
      return `<a class="link" ${target} href="${
        element.data.url
      }">${content}</a>`
    default:
      return null
  }
}

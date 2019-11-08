import { parseInt, get } from 'lodash'


export function sortArticlesByDate(a, b) {
  const releaseDateA = get(a, 'data.date')
  const releaseDateB = get(b, 'data.date')
  const publicationDateA = get(a, 'publicationdate')
  const publicationDateB = get(b, 'publicationdate')

  if (releaseDateB) {
    if (releaseDateA) {
      return parseInt(releaseDateB) - parseInt(releaseDateA)
    }
    return parseInt(releaseDateB) - parseInt(publicationDateA)
  }
  if (releaseDateA) {
    return parseInt(publicationDateB) - parseInt(releaseDateA)
  }
  return parseInt(publicationDateB) - parseInt(publicationDateA)
}
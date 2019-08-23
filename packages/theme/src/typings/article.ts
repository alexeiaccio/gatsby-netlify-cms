import { Image } from './image'

export interface ArticleHeader {
  fields: {
    slug: string
  }
  first_publication_date: string
  tags: string[]
  href: string
  data: {
    title: { text: string }
    image: ImgProps
    authors: [
      {
        author: {
          document: [{ data: { name: string } }]
          slug: string
        }
      }
    ]
  }
}

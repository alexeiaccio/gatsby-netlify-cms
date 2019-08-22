import { ImgProps } from '../components/img/index'

export interface ArticleHeader {
  first_publication_date: string
  tags: string[]
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

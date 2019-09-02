import { Article } from './article'
import { Image } from './image'

interface Item {
  articlelink?: {
    document: Article[]
  }
}

interface AboutSlice {
  __typename: 'PrismicAboutBodyLead' 
    | 'PrismicAboutBodyText'
    | 'PrismicAboutBodyCut'
    | 'PrismicAboutBodyImage'
  id?: string
  primary?: {
    text?: {
      html?: string
      text?: string
    }
    imageimage?: Image
    imagecaption?: {
      html?: string
      text?: string
    }
  }
  items?: Item[]
}

export interface AboutBody {
  body?: AboutSlice[]
}

export interface About {
  fields: {
    slug: string
  }
  first_publication_date: string
  tags: string[]
  href: string
  data: {
    title: { text: string }
    image: Image
    body?: AboutSlice[]
  }
}

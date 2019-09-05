import { Author } from './author'
import { Image } from './image'

interface Item {
  articlelink?: {
    document: Article[]
  }
  sliderimage?: Image
  slidercaptions?: {
    html?: string
    text?: string
  }
}

export interface ArticleSlice {
  __typename: 'PrismicArticlesBodyLead' 
    | 'PrismicArticlesBodyText'
    | 'PrismicArticlesBodyCut' 
    | 'PrismicArticlesBodyQuote'
    | 'PrismicArticlesBodyYoutube'
    | 'PrismicArticlesBodyImage'
    | 'PrismicArticlesBodyListOfArticles'
    | 'PrismicArticlesBodySlider'
    | 'PrismicArticlesBodyMedialink'
  id?: string
  primary?: {
    text?: {
      html?: string
      text?: string
    }
    quote?: {
      html?: string
      text?: string
    }
    cite?: {
      html?: string
      text?: string
    }
    youtubeid?: {
      html?: string
      text?: string
    }
    videoresource?: {
      html?: string
      text?: string
    }
    imageimage?: Image
    imagecaption?: {
      html?: string
      text?: string
    }
    mediacover?: Image
    mediacaption?: {
      html?: string
      text?: string
    }
    medialink?: {
      url?: string
      size?: string
    }
  }
  items?: Item[]
}

export interface ArticleBody {
  body?: ArticleSlice[]
}

export interface Article {
  fields: {
    slug: string
  }
  first_publication_date: string
  tags: string[]
  href: string
  data: {
    title: { text: string }
    image: Image
    authors: [
      {
        author: {
          document: Author[]
        }
      }
    ]
    body?: ArticleSlice[]
  }
}

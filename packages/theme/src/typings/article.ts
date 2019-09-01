import { Author } from './author'
import { Image } from './image'

interface Item {
  articlelink?: {
    document: ArticleHeader[]
  }
  sliderimage?: Image
  slidercaptions?: {
    html?: string
    text?: string
  }
}

interface ArticleSlice {
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
    mediacover?: {
      url: string
    }
    mediacaption?: {
      html?: string
      text?: string
    }
    medialink?: {
      url: string
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

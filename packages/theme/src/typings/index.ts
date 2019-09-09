import { Image } from './image'

interface Category {
  categorytitle: {
    text: string
  }
  categorydescription: {
    html: string
  }
}

interface BodyItem {
  __typename: 'PrismicIndexBodyBanner' | 'PrismicIndexBodyHighlight'
  primary?: {
    bannerbutton?: string
    expiredate?: number
    bannertext?: {
      html: string
    }
    bannerlink?: {
      url: string
      target: string
    }
  }
  image?: Image
  text?: {
    html: string
  }
  link?: {
    url: string
    target: string
  }
  expiredate?: number
}

export interface Index {
  title: {
    text: string
  }
  categories: Category[]
  body: BodyItem[]
}

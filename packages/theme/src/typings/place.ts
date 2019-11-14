import { Image } from './image'

interface Link {
  link: {
    url: string
  }
}

export interface Place {
  internal?: boolean
  data: {
    title: {
      text: string
    }
    description: {
      html: string
    }
    address: string
    links: Link[]
    image: Image
    caption: {
      html: string
    }
  }
  fields: {
    slug: string
  }
  first_publication_date: string
  tags: string[]
  href: string
}

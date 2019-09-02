import { Image } from './image'

export interface Author {
  data: {
    name: string
  }
  avatar?: Image
  type?: 'redsovet' | 'author' | 'link'
  fields: {
    slug: string
  }
}

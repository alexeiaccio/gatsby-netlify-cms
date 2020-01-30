import { Image } from './image'
import { Place } from './place'

export interface Link {
  link: {
    url: string | null
  }
}

export interface Event {
  internal?: boolean
  data: {
    title: {
      text: string
    }
    start: string | null
    startDate?: string | null
    starttime: string | null
    end: string | null
    endDate?: string | null
    description: {
      html: string
    } | null
    image: Image
    caption: {
      html: string
    } | null
    links: Link[]
    places: [
      {
        place: {
          document: Place[]
        }
      }
    ] | null
  }
  fields: {
    slug: string
  }
  first_publication_date: string
  tags: string[] | []
  href: string
}

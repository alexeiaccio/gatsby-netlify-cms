interface LocalImg {
  sizes: string
  srcSet: string
  src: string
  aspectRatio: number
  tracedSVG: string
}

export interface Image {
  src?: string | null | undefined
  fluid: LocalImg | null,
  fixed: LocalImg | null,
}
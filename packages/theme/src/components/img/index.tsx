import * as React from 'react'
import styled from '@emotion/styled'
import { get } from 'lodash'
import GatsbyImage from 'gatsby-image'
import tw from 'tailwind.macro'

import { Image as ImageProps } from '../../typings/image'

import { ImgHolder } from './holder'

const Image = styled('img')`
  ${tw`w-full`};
`

interface ImgProps {
  src: ImageProps
  css?: any
}

export function Img({ src, ...props }: ImgProps) {
  const imageSharp = get(src, 'localFile.childImageSharp')
  const fluid = get(imageSharp, 'fluid')
  const fixed = get(imageSharp, 'fixed')
  const url = get(src, 'url')

  if (fluid) {
    return <GatsbyImage fluid={fluid} {...props} />
  }

  if (fixed) {
    return <GatsbyImage fixed={fixed} {...props} />
  }

  if (url) {
    return <Image src={url} {...props} alt={get(src, 'alt', '')} loading="lazy" />
  }

  return <ImgHolder {...props} />
}
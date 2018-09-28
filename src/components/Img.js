/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import GatsbyImage from 'gatsby-image'

export const Img = ({ src, ...props }) => (
  <>
    {src.localFile && src.localFile.childImageSharp
      ? src.localFile.childImageSharp.fluid
        ? <GatsbyImage fluid={src.localFile.childImageSharp.fluid} {...props} />
        : <GatsbyImage fixed={src.localFile.childImageSharp.fixed} {...props} />
      : src.url 
        ? <img
            alt=""
            className={css`
              ${tw(['w-full'])};
            `}
            src={src.url}
          />
        : false
    }
  </>
)

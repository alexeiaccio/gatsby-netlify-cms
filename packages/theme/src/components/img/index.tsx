import * as React from 'react'
import { css } from '@emotion/core'

import { ImgHolder } from './holder'

type ImageProps = {
  src: string | undefined
  alt?: string
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2' | '8:5'
  className?: string
  css?: string
  maxSize?: number 
}

const RATIOS = {
  '1:1': '100%',
  '16:9': '56.25%',
  '4:3': '75%',
  '3:2': '66.66%',
  '8.5': '62.5%',
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  aspectRatio = '4:3',
  className = '',
  css: styles = '',
  // maxSize = 1920,
}) => {
  const srcSet: string[] = []

  if (src && src.includes('prismic')) {
    const url = `${src.replace(/\?.+$/g, '')}?auto=format`
    const [w, h] = aspectRatio.split(':')
    const ratio = parseInt(h) / parseInt(w)
    srcSet.push(`${url}&amp;fit=max&amp;w=960&amp;h=${960 * ratio} 1920w`)
    // srcSet.push(`${url}&amp;fit=max&amp;w=3840&amp;h=${3840 * ratio} 3840w`)
    // srcSet.push(`${url}&amp;fit=max&amp;w=2880&amp;h=${2880 * ratio} 2880w`)
    srcSet.push(`${url}&amp;fit=max&amp;w=800&amp;h=${800 * ratio} 960w`)
    srcSet.push(`${url}&amp;fit=max&amp;w=640&amp;h=${640 * ratio} 800w`)
    srcSet.push(`${url}&amp;fit=max&amp;w=320&amp;h=${320 * ratio} 480w`)
  }

  return (
    <div className={`relative overflow-hidden ${className}`} css={styles}>
      <div
        className="w-full bg-center bg-no-repeat bg-cover"
        css={css`
          padding-bottom: ${RATIOS[aspectRatio]};
          background-color: var(--color);
          background-image: url(${src ? src.replace(/\?.+$/g, '') : '/social.png'}?px=20&w=320);
        `}
      />
      {!src ? (
        <ImgHolder className={className} css={styles} />
      ) : (
        <picture>
          {srcSet.length ? (
            <>
              <source type="image/webp" srcSet={srcSet.join(', ')} sizes="" />
              <source srcSet={srcSet.join(', ')} sizes="" />
              <img
                sizes=""
                srcSet={srcSet.join(', ')}
                src={srcSet[0]}
                alt={alt}
                // @ts-ignore
                loading="lazy"
                className="absolute inset-0 object-contain object-center w-full h-full"
                css={css`
                  image-rendering: pixelated;
                `}
              />
            </>
          ) : (
            <img
              src={src}
              alt={alt}
              // @ts-ignore
              loading="lazy"
              className="absolute inset-0 object-contain object-center w-full h-full"
              css={css`
                image-rendering: pixelated;
              `}
            />
          )}
        </picture>
      )}
    </div>
  )
}

export const Img = React.memo(Image)

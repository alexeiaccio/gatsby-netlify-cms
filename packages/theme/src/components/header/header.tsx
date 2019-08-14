import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { Logo } from '../logo/index'
import { Runner } from './runner'

interface HeaderProps {
  sticked: boolean
}

export function Header(props: HeaderProps) {
  const { sticked } = props
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          motto
        }
      }
    }
  `)

  return (
    <div
      css={css`
        ${tw`
          flex flex-col items-center
          bg-black
          select-none
          w-full
        `};
        ${!sticked && tw`pt-2`};
      `}
    >
      <Logo height={sticked ? 50 : 100} />
      {!sticked && <div
        css={css`
          ${tw`
            text-white text-xl
            font-sans font-semibold tracking-wide
          `};
          ${!sticked && tw`pt-2`};
        `}
      >
        {data.site.siteMetadata.title}
      </div>
      }
      <div
        css={css`
          ${tw`
            text-green-500 text-xs
            font-sans
            overflow-hidden
            w-full
          `};
          ${sticked && tw`text-xxs`};
        `}
      >
        <Runner string={data.site.siteMetadata.motto} />
      </div>
    </div>
  )
}

import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import get from 'lodash/get'

import {
  ButtonOutlinedBlock,
  ButtonOutlinedDisabled,
} from '../elements/buttons'
import Link from '../elements/link'
import { translite } from '../../utils/makePath'
import { uuid } from '../../utils'

const navStyles = css`
  ${tw([
    'flex',
    'flex-row',
    'flex-wrap',
    'items-center',
    'justify-center',
    'max-w-md',
    'mx-auto',
    'py-q24',
  ])};
`

const linkStyles = css`
  ${tw([
    'flex-auto',
    'md:flex-1',
    'mb-q8',
    'px-q8',
    'w-full',
    'hover:bg-green',
    'md:w-auto',
  ])};
`

function Menu({ index, pages, location }) {
  const LinkOrMove =
    location && location === '/'
      ? ButtonOutlinedBlock
      : ButtonOutlinedBlock.withComponent(Link)

  const handleClick = link => {
    if (document !== undefined && window !== undefined) {
      const top = get(document.getElementById(link), 'offsetTop')
      window.scrollTo({ top, behavior: 'smooth' })
      setTimeout(() => {
        const nextTop = get(document.getElementById(link), 'offsetTop')
        window.scrollTo({ top: nextTop, behavior: 'smooth' })
      }, 200)
    }
  }

  return (
    <nav css={navStyles}>
      {[
        { categorytitle: { text: 'Новое' } },
        { categorytitle: { text: 'Афиша' } },
      ]
        .concat(index.data.categories)
        .concat({ categorytitle: { text: 'О нас' } })
        .map(category => {
          const link = translite(category.categorytitle.text)
          const pageExist = pages.edges.some(
            ({ node }) => node.path.replace(/\//g, '') === link
          )

          return (
            <Fragment key={uuid()}>
              {location === '/' ? (
                <LinkOrMove css={linkStyles} onClick={() => handleClick(link)}>
                  {category.categorytitle.text}
                </LinkOrMove>
              ) : pageExist ? (
                <LinkOrMove css={linkStyles} to={link}>
                  {category.categorytitle.text}
                </LinkOrMove>
              ) : (
                <ButtonOutlinedDisabled
                  css={css`
                    ${tw(['flex-1', 'mb-q8', 'px-q4'])};
                  `}
                >
                  {category.categorytitle.text}
                </ButtonOutlinedDisabled>
              )}
            </Fragment>
          )
        })}
    </nav>
  )
}

Menu.propTypes = {
  index: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.string.isRequired,
  pages: PropTypes.objectOf(PropTypes.any).isRequired,
}

function WithStaticQuery(props) {
  return (
    <StaticQuery
      query={graphql`
        query MenuQuery {
          index: prismicIndex {
            data {
              categories {
                categorytitle {
                  text
                }
              }
            }
          }
          pages: allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }
      `}
      render={({ index, pages }) => (
        <Menu index={index} pages={pages} {...props} />
      )}
    />
  )
}

export default memo(WithStaticQuery)

import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from '@emotion/core'
import get from 'lodash/get'
import { Img } from '../components/Img'

import { ButtonOutlined } from '../components/Buttons'
import { HTMLContent } from '../components/Content'
import { PreviewCard } from '../components/Cards'
import { Column, Row } from '../components/Grid'
import { Heading1, Heading2 } from '../components/Typography'
import { RichTextSmall } from '../components/RichText'
import { uuid } from '../utils'

export default ({ data, location }) => {
  const { edges: articles } = data.articles
  const author = data.author.data
  const from = get(location, 'state.from', '/')

  return (
    <>
      <section>
        <div
          css={css`
            ${tw([
              'bg-white',
              'mb-q36',
              'items-center',
              'justify-center',
              'flex',
              'w-full',
            ])};
          `}
        >
          <Img
            css={css`
              ${tw(['rounded-full'])};
              height: 320px;
              max-height: 75vw;
              max-width: 75vw;
              width: 320px;
            `}
            src={author.avatar}
          />
        </div>
        <h1
          css={css`
            ${Heading1};
            ${tw(['text-center', 'mb-q48', 'text-black'])};
          `}
          alt={author.name}
        >
          {author.name}
        </h1>
        {author.statement.html && (
          <HTMLContent
            css={css`
              ${RichTextSmall};
              ${tw(['text-center'])};
              & p {
                ${tw(['m-0'])};
              }
            `}
            content={author.statement.html}
          />
        )}
        {author && articles.length > 0 && (
          <h2
            css={css`
              ${Heading2};
              ${tw(['mb-q48', 'mt-q72', 'text-center'])};
            `}
          >
            Статьи
          </h2>
        )}
        <Row>
          {author &&
            articles.map(({ node: article }) => (
              <Column key={uuid()}>
                <PreviewCard {...{ article }} key={uuid()} />
              </Column>
            ))}
        </Row>
        <Link
          css={css`
            ${tw(['block', 'mt-q48', 'mx-auto', 'text-center'])};
          `}
          to={from}
        >
          <span
            css={css`
              ${ButtonOutlined};
            `}
          >
            {from.includes('o-nas')
              ? '← Все авторы'
              : from === '/'
              ? '← На главную'
              : '← Вернуться'}
          </span>
        </Link>
      </section>
    </>
  )
}

export const pageQuery = graphql`
  query AuthorQuery($slug: String!) {
    author: prismicAuthors(fields: { slug: { eq: $slug } }) {
      data {
        name
        statement {
          html
        }
        avatar {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 320, quality: 80) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
    articles: allPrismicArticles(
      filter: {data: {authors: {elemMatch: {author: {slug: {eq: $slug}}}}}}
      sort: { order: DESC, fields: [first_publication_date] }
    ) {
      edges {
        node {
          ...ArticleHeader
          fields {
            slug
          }
          data {
            title {
              text
            }
          }
        }
      }
    }
  }
`

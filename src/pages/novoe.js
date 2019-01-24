import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from '@emotion/core'

import { ButtonOutlined } from '../components/Buttons'
import { PreviewCard } from '../components/Cards'
import { Column, Row } from '../components/Grid'
import Layout from '../components/Layout'
import { Heading1 } from '../components/Typography'
import { uuid } from '../utils'

export default ({ data, location }) => {
  const { edges: articles } = data.articles

  return (
    <>
      <section>
        <h1
          className={css`
            ${Heading1};
            ${tw(['text-center', 'mb-q72', 'text-black'])};
          `}
        >
          Новые статьи
        </h1>
        <Row>
          {articles.map(({ node: article }) => (
            <Column key={uuid()}>
              <PreviewCard {...{ article }} key={uuid()} />
            </Column>
          ))}
        </Row>
        <Link
          className={css`
            ${tw(['block', 'mt-q48', 'mx-auto', 'text-center'])};
          `}
          to={'/'}
        >
          <span
            className={css`
              ${ButtonOutlined};
            `}
          >
            ← Все статьи
          </span>
        </Link>
      </section>
    </>
  )
}

export const pageQuery = graphql`
  query NewQuery {
    articles: allPrismicArticles(
      sort: { order: DESC, fields: [first_publication_date] }
      limit: 10
      filter: { tags: { nin: "Афиша" } }
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

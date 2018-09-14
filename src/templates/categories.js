/* global tw */
import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'
import { startCase } from 'lodash/fp'

import { ButtonOutlined } from '../components/Buttons'
import Layout from '../components/Layout'
import { Preview } from '../components/Preview'
import { Heading1 } from '../components/Typography'
import { getCategory, uuid } from '../utils'

export default ({ data, location }) => {
  const { edges: articles } = data.articles

  return (
    <Layout {...{ location }} title={'·К·Р·А·П·И·В·А·'}>
      <>
        <section>
          <h1
            className={css`
              ${Heading1};
              ${tw(['text-center', 'mb-q72', 'text-black'])};
            `}
          >
            <small
              className={css`
                ${tw(['block', 'text-body'])};
              `}
            >
              Рубрика
            </small>
            {startCase(getCategory(location.pathname.replace(/\//g, '')))}
          </h1>
          <div
            className={css`
              ${tw(['flex', 'flex-row', 'flex-wrap', 'mt-q64', 'w-full'])};
            `}
          >
            {articles.map(({ node: article }) => (
              <Preview {...{ article }} key={uuid()} />
            ))}
          </div>
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
              ⭠ Все статьи
            </span>
          </Link>
        </section>
      </>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoriesQuery($slug: String!) {
    articles: allPrismicArticles(
      filter: { data: { category: { eq: $slug } } }
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

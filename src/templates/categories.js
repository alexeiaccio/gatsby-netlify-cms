/* global tw */
import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'
import { startCase } from 'lodash/fp'

import { ButtonOutlined } from '../components/Buttons'
import { PreviewCard } from '../components/Cards'
import { HTMLContent } from '../components/Content'
import { Column, Row } from '../components/Grid'
import Layout from '../components/Layout'
import { Heading1 } from '../components/Typography'
import { getCategory, uuid } from '../utils'

export default ({ data, location }) => {
  const { edges: articles } = data.articles
  const { data: index } = data.index
  const indexCategory = index.categories.filter(
    ({ categoryid }) => categoryid === articles[0].node.data.category
  )
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
              ${tw(['my-q48', 'text-body', 'text-justify'])};
            `}
          >
            {
              <HTMLContent
                content={indexCategory[0].categorydescription.html}
              />
            }
          </div>
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
            category
            title {
              text
            }
          }
        }
      }
    }
    index: prismicIndex {
      data {
        title {
          text
        }
        categories {
          categoryid
          categorytitle {
            text
          }
          categorydescription {
            html
          }
        }
      }
    }
  }
`

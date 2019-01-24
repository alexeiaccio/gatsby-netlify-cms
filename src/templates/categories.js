/* global tw */
import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'
import { get } from 'lodash/fp'

import { ArticleHeader } from '../components/ArticleHeader'
import { ArticleBody } from '../components/ArticleBody'
import { ButtonOutlined } from '../components/Buttons'
import { Column, Row } from '../components/Grid'
import { Heading1 } from '../components/Typography'
import { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import { PreviewCard } from '../components/Cards'
import { uuid } from '../utils'

export default ({ data, location }) => {
  const { edges } = data.articles
  const index = data.index.data
  const article = edges[0].node.data
  const indexCategory = index.categories.filter(
    ({ categorytitle }) => get('[0].node.tags', edges)
      .some(tag => tag === categorytitle.text)
  )
  const isAfisha = get('[0].node.tags', edges)
    .some(tag => tag === 'Афиша')
  const articles = isAfisha ? edges.slice(1) : edges
  const title = get('[0].categorytitle.text', indexCategory)
  
  return (
    <Layout image={article.image} {...{ location }} {...{title}}>
      <>
        {isAfisha && (
          <section>
            <article
              className={css`
                ${tw(['my-q48'])};
              `}
            >
              <h1 className={Heading1}>{article.title.text}</h1>
              <ArticleHeader
                {...{ article }}
                date={edges[0].node.first_publication_date}
                {...{ location }}
              />
              <ArticleBody {...{ article }} />
            </article>
          </section>
        )}
        <section>
          {!isAfisha && (
            <>
              <h1
                className={css`
                  ${Heading1};
                  ${tw(['text-center', 'mb-q72', 'text-black'])};
                `}
              >
                {title}
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
            </>
          )}
          <Row id="articles">
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
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoriesQuery($slug: [String]) {
    articles: allPrismicArticles(
      filter: { fields: { tags: { in: $slug } } }
      sort: { order: DESC, fields: [first_publication_date] }
    ) {
      edges {
        node {
          ...ArticleHeader
          ...ArticleBody
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
    index: prismicIndex {
      data {
        title {
          text
        }
        categories {
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

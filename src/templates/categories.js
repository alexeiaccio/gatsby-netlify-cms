import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from '@emotion/core'
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
  const indexCategory = index.categories.filter(({ categorytitle }) =>
    get('[0].node.tags', edges).some(tag => tag === categorytitle.text)
  )
  const isAfisha = get('[0].node.tags', edges).some(tag => tag === 'Афиша')
  const articles = isAfisha ? edges.slice(1) : edges
  const title = get('[0].categorytitle.text', indexCategory)

  return (
    <>
      {isAfisha && (
        <section>
          <article
            css={css`
              ${tw(['bg-white', 'my-q48'])};
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
              css={css`
                ${Heading1};
                ${tw(['text-center', 'mb-q72', 'text-black'])};
              `}
            >
              {title}
            </h1>
            <div
              css={css`
                ${tw(['my-q48', 'text-body', 'text-justify'])};
              `}
            >
              {
                <HTMLContent
                  content={get('[0].categorydescription.html', indexCategory)}
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
          css={css`
            ${tw(['block', 'mt-q48', 'mx-auto', 'text-center'])};
          `}
          to={'/'}
        >
          <span
            css={css`
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

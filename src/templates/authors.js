/* global tw */
import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'
import { Img } from '../components/Img'

import { ButtonOutlined } from '../components/Buttons'
import { HTMLContent } from '../components/Content'
import { PreviewCard } from '../components/Cards'
import { Column, Row } from '../components/Grid'
import Layout from '../components/Layout'
import { Heading1, Heading2 } from '../components/Typography'
import { RichTextSmall } from '../components/RichText'
import { uuid } from '../utils'

export default ({ data, location }) => {
  const { edges: articles } = data.articles
  const author = data.author.data

  const getArticles = author =>
    articles.filter(({ node: { data } }) =>
      data.authors.some(
        ({ author: { document } }) => document[0].data.name === author.name
      )
    ).filter(({ node: { data } }) => data.category !== 'archive')

  return (
    <Layout {...{ location }} title={author.name}>
      <>
        <section>
          <div
            className={css`
              ${tw([
                'mb-q36',
                'items-center',
                'justify-center',
                'flex',
                'w-full',
              ])};
            `}
          >
            <Img
              className={css`
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
            className={css`
              ${Heading1};
              ${tw(['text-center', 'mb-q48', 'text-black'])};
            `}
            alt={author.name}
          >
            {author.name}
          </h1>
          {author.statement.html && (
            <HTMLContent
              className={css`
                ${RichTextSmall};
                ${tw(['text-center'])};
                & p {
                  ${tw(['m-0'])};
                }
              `}
              content={author.statement.html}
            />
          )}
          {getArticles(author).length > 0 && (
            <h2
              className={css`
                ${Heading2};
                ${tw(['mb-q48', 'mt-q72', 'text-center'])};
              `}
            >
              Статьи
            </h2>
          )}
          <Row>
            {getArticles(author).map(({ node: article }) => (
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
            authors {
              author {
                document {
                  data {
                    name
                  }
                }
              }
            }
            title {
              text
            }
          }
        }
      }
    }
  }
`

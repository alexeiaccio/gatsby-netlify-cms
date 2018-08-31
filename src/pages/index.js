/* global tw */
import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'

import Layout from '../components/Layout'
import { ArticleHeader } from '../components/ArticleHeader'
import { ArticleBody } from '../components/ArticleBody'
import { Heading1 } from '../components/Typography'
import logo from '../img/logo.svg'
import { uuid } from '../utils'

const IndexPage = ({ data }) => {
  const { edges: articles } = data.allPrismicArticles

  return (
    <Layout>
      <section>
        {articles.map(({ node }) => {
          const article = node.data
          const cuttedArticle = article.body
            .reduceRight((acc, cur) => {
              while (cur.__typename !== 'PrismicArticlesBodyCut') {
                return acc.concat(cur)
              }
              return []
            }, [])
            .reverse()

          return (
            <article
              className={css`
                ${tw(['mb-q48'])};
              `}
              key={uuid()}
            >
              <div
                to="/"
                className={css`
                  ${tw([
                    'bg-center',
                    'bg-contain',
                    'bg-no-repeat',
                    'mx-auto',
                    'my-q64',
                  ])};
                  background-image: url(${logo});
                  height: 45px;
                  transform: rotateZ(135deg);
                  width: 90px;
                `}
              />
              <Link key={uuid()} to={node.fields.slug}>
                <h2
                  className={css`
                    ${Heading1};
                    ${tw(['text-white', 'md:text-black'])};
                  `}
                >
                  {article.title.text}
                </h2>
              </Link>
              <ArticleHeader key={uuid()} {...{ article }} />
              <ArticleBody key={uuid()} article={{ body: cuttedArticle }} />
              <Link
                className={css`
                  ${tw(['block', 'mt-q24', 'mx-auto'])};
                  max-width: 9rem;
                `}
                key={uuid()}
                to={node.fields.slug}
              >
                <span
                  className={css`
                    ${tw([
                      'bg-white',
                      'hover:bg-black',
                      'inline-flex',
                      'border',
                      'border-black',
                      'border-solid',
                      'font-montserrat',
                      'items-center',
                      'justify-center',
                      'px-q24',
                      'py-q12',
                      'text-black',
                      'hover:text-white',
                      'text-sm',
                      'uppercase',
                      'w-full',
                    ])};
                    transition: all 200ms ease-in-out;
                  `}
                  key={uuid()}
                >
                  Продолжение →
                </span>
              </Link>
            </article>
          )
        })}
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allPrismicArticles(
      sort: { order: DESC, fields: [first_publication_date] }
    ) {
      edges {
        node {
          ...ArticleHeader
          ...ArticleBody
          first_publication_date
          last_publication_date
          type
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

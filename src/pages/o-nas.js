/* global tw */
import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from 'emotion'

import { AboutBody } from '../components/AboutBody'
import { HTMLContent } from '../components/Content'
import { RichTextSmall } from '../components/RichText'
import Layout from '../components/Layout'
import { Heading1, Heading2, Heading6 } from '../components/Typography'
import { uuid } from '../utils'

const AboutPage = ({ data }) => {
  const about = data.about.data
  const { edges: authors } = data.authors

  return (
    <Layout>
      <>
        <h1 className={Heading1}>{about.title.text}</h1>
        <AboutBody {...{ about }} />
        <h2
          className={css`
            ${Heading2};
            ${tw(['mt-q72'])};
          `}
        >
          Авторы
        </h2>
        <div
          className={css`
            ${tw([
              'flex',
              'flex-row',
              'flex-wrap',
              '-mx-4',
              'mt-q64',
              'w-full',
            ])};
          `}
        >
          {authors.map(({ node }) => {
            const author = node.data
            return (
              <div
                className={css`
                  ${tw([
                    'flex-no-shrink',
                    'mb-q72',
                    'mx-q16',
                    'text-white',
                    'md:text-black',
                    'w-full',
                  ])};
                  max-width: calc(50% - 2rem);
                `}
                key={uuid()}
              >
                <Img
                  className={css`
                    ${tw(['rounded-full'])};
                  `}
                  key={uuid()}
                  fluid={author.avatar.localFile.childImageSharp.fluid}
                />
                <div
                  className={css`
                    ${tw(['pl-q36'])};
                  `}
                  key={uuid()}
                >
                  <h3
                    className={css`
                      ${Heading6};
                      ${tw(['my-q48'])};
                    `}
                    key={uuid()}
                  >
                    {author.name}
                  </h3>
                  {author.statement.html && (
                    <HTMLContent
                      className={RichTextSmall}
                      content={author.statement.html}
                      key={uuid()}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query AboutQuery {
    authors: allPrismicAuthors(sort: { fields: [data___name] }) {
      edges {
        node {
          data {
            name
            statement {
              html
            }
            avatar {
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
      }
    }
    about: prismicAbout {
      ...AboutBody
      data {
        title {
          text
        }
      }
    }
  }
`

/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'
import { startCase } from 'lodash'
import Typograf from 'typograf'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { getCategory, localDate } from '../utils'

const tp = new Typograf({ locale: ['ru', 'en-US'] })
const Excerpt = HTMLContent || Content

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const match = x => x.replace(/\n/g, '').match(/(.+)(<!-- end -->)/)
    const excerpt = x => (match(x) ? match(x)[1] : x)
    return (
      <Layout>
        <section>
          {posts.map(({ node: post }) => (
            <article
              className={css`
                ${tw(['mb-q48'])};
              `}
              key={post.id}
            >
              <h1>
                <Link
                  className={css`
                    ${tw(['mb-2'])};
                  `}
                  to={post.fields.slug}
                >
                  {post.frontmatter.title}
                </Link>
              </h1>
              <div
                className={css`
                  ${tw(['font-montserrat', 'italic', 'mb-4', 'text-xs'])};
                `}
              >
                <span>{startCase(getCategory(post.frontmatter.category))}</span>
                <span> · </span>
                <span>{localDate(post.frontmatter.date)}</span>
                {post.frontmatter.authors && post.frontmatter.authors.length ? (
                  <span>
                    <span> ·</span>
                    {post.frontmatter.authors.map(author => (
                      <span key={author + `author`}> {author} ·</span>
                    ))}
                  </span>
                ) : null}
              </div>
              <div>
                <Excerpt content={excerpt(tp.execute(post.html))} />
                <Link to={post.fields.slug}>
                  <span
                    className={css`
                      ${tw([
                        'bg-white',
                        'hover:bg-black',
                        'inline-block',
                        'border',
                        'border-black',
                        'border-solid',
                        'font-montserrat',
                        'mt-4',
                        'p-2',
                        'text-black',
                        'hover:text-white',
                        'text-xs',
                      ])};
                      font-variant: all-petite-caps;
                      transition: all 200ms ease-in-out;
                    `}
                  >
                    Продолжение →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "article-template" } } }
    ) {
      edges {
        node {
          html
          id
          fields {
            slug
          }
          frontmatter {
            authors
            date(formatString: "DD MMMM YYYY")
            category
            templateKey
            title
          }
        }
      }
    }
  }
`

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { localDate } from '../utils'

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
            <article className="content" key={post.id}>
              <h1>
                <Link className="has-text-primary" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
              </h1>
              <div>
                {post.frontmatter.authors && post.frontmatter.authors.length ? (
                  <span>
                    <span>·</span>
                    {post.frontmatter.authors.map(author => (
                      <span key={author + `author`}> {author} ·</span>
                    ))}
                  </span>
                ) : null}
                <span
                  style={{
                    fontFamily: 'Montserrat',
                    fontVariant: 'unicase',
                  }}
                >
                  <span> </span>
                  {localDate(post.frontmatter.date)}
                </span>
              </div>
              <div>
                <Excerpt content={excerpt(post.html)} />
                <br />
                <br />
                <Link className="button is-small" to={post.fields.slug}>
                  Продолжение →
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
            title
            templateKey
            authors
            date(formatString: "DD MMMM YYYY")
          }
        }
      }
    }
  }
`

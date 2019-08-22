import React from 'react'
import { graphql } from 'gatsby'
import { Layout, IndexBody } from '@krapiva-org/theme'

// import '@krapiva-org/theme/src/utils/globals.css'

function IndexPage({ data, location }: any) {
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
    >
      <IndexBody
        articles={data.allPrismicArticles.nodes}
      />
    </Layout>
  )
}

export const PageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteTitle
        siteMotto
      }
    }
    prismicIndex {
      data {
        title {
          text
        }
        body {
          primary {
            expiredate(difference: "days")
            bannerbutton
            bannertext {
              html
            }
            bannerlink {
              url
              target
            }
          }
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
    allPrismicArticles(sort: {order: DESC, fields: first_publication_date}, limit: 100) {
      nodes {
        first_publication_date(locale: "ru", formatString: "DD MMMM YYYY")
        tags
        data {
          title {
            text
          }
          image {
            url
            localFile {
              childImageSharp {
                fluid(maxWidth: 640, quality: 80) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
          authors {
            author {
              document {
                ... on PrismicAuthors {
                  data {
                    name
                  }
                }
              }
              slug
            }
          }
        }
      }
    }
  }
`

export default IndexPage

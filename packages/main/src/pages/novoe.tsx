import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '@krapiva-org/theme'

// import '@krapiva-org/theme/src/utils/globals.css'

function NovoePage({ data, location }: any) {
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
    >
    Poop
    </Layout>
  )
}

export const PageQuery = graphql`
  query NovoeQuery {
    site {
      siteMetadata {
        siteTitle
        siteMotto
        siteUrl
      }
    }
    prismicIndex {
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
        body {
          __typename
          ... on PrismicIndexBodyBanner {
            primary {
              bannerbutton
              expiredate(difference: "days")
              bannertext {
                html
              }
              bannerlink {
                url
                target
              }
            }
          }
          ... on PrismicIndexBodyHighlight {
            primary {
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
              text {
                html
              }
              link {
                url
                target
              }
              expiredate(difference: "days")
            }
          }
        }
      }
    }
    allPrismicArticles(
      filter: {fields: {tags: {nin: ["afisha", "arhiv"]}}},
      sort: {order: DESC, fields: first_publication_date},
      limit: 100
    ) {
      nodes {
        fields {
          slug
        }
        first_publication_date(locale: "ru", formatString: "DD MMMM YYYY")
        tags
        href
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
                  fields {
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default NovoePage

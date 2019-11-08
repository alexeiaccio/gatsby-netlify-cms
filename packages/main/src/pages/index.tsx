import React from 'react'
import { graphql } from 'gatsby'

import { Layout, IndexBody } from '@krapiva-org/theme'

function IndexPage({ data, location }: any) {
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
    >
      <IndexBody
        articles={data.allPrismicArticles.nodes}
        about={data.prismicAbout.data}
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
        siteUrl
        siteDescription
        siteKeywords
        siteThemeColor
        twitter
        fbAppId

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
              expiredate
            }
          }
        }
      }
    }
    allPrismicArticles(
      filter: {fields: {tags: {nin: ["afisha"]}}},
      sort: {order: DESC, fields: first_publication_date},
      limit: 100
    ) {
      nodes {
        fields {
          slug
        }
        first_publication_date(locale: "ru", formatString: "DD MMMM YYYY")
        publicationdate: first_publication_date(formatString: "x")
        tags
        href
        data {
          releasedate(locale: "ru", formatString: "DD MMMM YYYY")
          date: releasedate(formatString: "x")
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
    prismicAbout {
      data {
        body {
          __typename
          ... on PrismicAboutBodyLead {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicAboutBodyImage {
            primary {
              imageimage {
                url
              }
              imagecaption {
                html
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage

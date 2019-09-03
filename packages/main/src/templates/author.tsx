import * as React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'

import { Layout, AuthorBody } from '@krapiva-org/theme'

function AuthorPage({ data, location }) {
  const name = get(data.prismicAuthors, 'data.name')

  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
    >
      <AuthorBody
        author={data.prismicAuthors}
        articles={data.allPrismicArticles.nodes}
      />
    </Layout>
  )
}

export const PagetQuery = graphql`
  query AuthorQuery($slug: String!) {
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
    prismicAuthors(fields: {slug: {eq: $slug}}) {
      data {
        avatar {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 640, quality: 80) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
        name
        type
        statement {
          html
        }
      }
      fields {
        slug
      }
    }
    allPrismicArticles(
      filter: {data: {authors: {elemMatch: {author: {slug: {eq: $slug}}}}}}
      sort: {fields: first_publication_date, order: DESC}
    ) {
      nodes {
        fields {
          slug
          tags
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

export default AuthorPage

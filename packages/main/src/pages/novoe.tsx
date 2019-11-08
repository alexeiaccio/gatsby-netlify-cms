import React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'

import { Layout, CategoryBody } from '@krapiva-org/theme'

function NovoePage({ data, location }: any) {
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
      seo={{
        title: "Новые статьи",
        image: get(data.allPrismicArticles.nodes, '0.data.image'),
      }}
    >
    <CategoryBody
      title="Новые статьи"
      articles={data.allPrismicArticles.nodes}
    />
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
        }
      }
    }
    allPrismicArticles(
      filter: {fields: {tags: {nin: ["afisha", "arhiv"]}}},
      sort: {order: DESC, fields: first_publication_date},
      limit: 24
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
  }
`

export default NovoePage

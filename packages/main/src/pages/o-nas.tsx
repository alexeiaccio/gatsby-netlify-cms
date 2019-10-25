import * as React from 'react'
import { graphql } from 'gatsby'
import { get, find } from 'lodash'

import { Layout, AboutBody } from '@krapiva-org/theme'

function AboutPage({ data, location }) {
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
      seo={{
        title: "Новые статьи",
        image: get(
          find(
            get(data.prismicAbout, 'data.body'),
            ['__typename', 'PrismicAboutBodyImage']
          ),
          'primary.imageimage'
        )
      }}
    >
      <AboutBody
        about={data.prismicAbout.data}
        authors={data.allPrismicAuthors.nodes}
      />
    </Layout>
  )
}

export const PageQuery = graphql`
  query AboutQuery {
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
    prismicAbout {
      data {
        title {
          text
        }
        body {
          __typename
          ... on PrismicAboutBodyLead {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicAboutBodyText {
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
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1280, quality: 80) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
              }
              imagecaption {
                html
              }
            }
          }
          ... on PrismicAboutBodyCut {
            id
          }
        }
      }
    }
    allPrismicAuthors {
      nodes {
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
    }
  }
`

export default AboutPage
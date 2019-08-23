import * as React from 'react'

import { graphql } from 'gatsby'
import { Layout } from '@krapiva-org/theme'

function AboutPage({ data, location }) {
  console.log(data)
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
    >
      <h1>{data.prismicAbout.data.title.text}</h1>
    </Layout>
  )
}

export const PageQuery = graphql`
  query AboutQuery {
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
  }
`

export default AboutPage
import * as React from 'react'

import { graphql } from 'gatsby'
import { Layout, IndexBody } from '@krapiva-org/theme'

function AboutPage({ data, location }) {
  console.log(data)
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex}
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
        title {
          text
        }
      }
    }
  }
`

export default AboutPage
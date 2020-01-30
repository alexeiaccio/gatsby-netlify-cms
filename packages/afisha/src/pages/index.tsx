import * as React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'
import * as moment from 'moment'

import { AfishaBody, Layout } from '@krapiva-org/theme'

function IndexPage({ data, location }: any) {
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
      seo={{
        title: 'Афиша',
        image: get(data.allPrismicEvents, 'nodes.0.data.image'),
      }}
    >
      <AfishaBody
        events={data.allPrismicEvents.nodes.filter(node => {
          const date = get(node, 'data.endDate') || get(node, 'data.startDate')
          if (!date) return false
          const diff = moment(date).diff(moment(), 'days')
          return diff >= 0
        })}
        title="Афиша"
        location={location}
      />
    </Layout>
  )
}

export const PageQuery = graphql`
  query IndexQuery($today: Date!) {
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
    allPrismicEvents(
      filter: {data: {end: {gte: $today}}},
      sort: {fields: data___start, order: DESC},
    ) {
      nodes {
        tags
        fields {
          slug
        }
        data {
          title {
            text
          }
          start(locale: "ru", formatString: "DD MMMM YYYY")
          startDate: start
          starttime
          end(locale: "ru", formatString: "DD MMMM YYYY")
          endDate: end
          description {
            html
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
          caption {
            html
          }
          links {
            link {
              url
            }
          }
          places {
            place {
              document {
                ... on PrismicPlaces {
                  fields {
                    slug
                  }
                  data {
                    title {
                      text
                    }
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

export default IndexPage

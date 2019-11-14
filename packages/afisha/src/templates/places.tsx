import React from 'react'
import { graphql } from 'gatsby'
// import { get } from 'lodash'

// import { Layout, ArticleBody, PrevNextLinks } from '@krapiva-org/theme'

function PlacePage({ data, location }: any) {
  console.log(data)
  return <div>Poop</div>
  // return (
  //   <Layout
  //     location={location}
  //     meta={data.site.siteMetadata}
  //     index={data.prismicIndex.data}
  //     seo={{
  //       title: get(data.prismicPlace, 'data.title.text'),
  //       image: get(data.prismicPlace, 'data.image'),
  //     }}
  //     blackHeader
  //   >
  //     <ArticleBody data={data.prismicPlace} />
  //     <PrevNextLinks
  //       prev={get(data, 'prev.nodes.0', null)}
  //       next={get(data, 'next.nodes.0', null)}
  //     />
  //   </Layout>
  // )
}

export const PageQuery = graphql`
  query PlaceQuery($slug: String!) {
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
    prismicPlaces(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      first_publication_date
      tags
      href
      data {
        title {
          text
        }
        description {
          html
        }
        address
        links {
          link {
            url
          }
        }
        image {
          alt
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 1280, quality: 80) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
        caption {
          html
        }
      }
    }
  }
`

export default PlacePage

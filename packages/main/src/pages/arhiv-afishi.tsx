import React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'

import { Layout, AfishaBody } from '@krapiva-org/theme'

function AfishaPage({ data, location }: any) {
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
      seo={{
        title: "Архив афиши",
        image: get(data.allPrismicArticles.nodes, '0.data.image'),
      }}
    >
    <AfishaBody
      title="Архив афиши"
      articles={data.allPrismicArticles.nodes}
      location={location}
    />
    </Layout>
  )
}

export const PageQuery = graphql`
  query AfishaQuery {
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
      filter: {fields: {tags: {in: ["afisha"]}}},
      sort: {order: DESC, fields: first_publication_date},
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
            alt
            url
          }
          caption {
            html
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
          body {
            __typename
            ... on PrismicArticlesBodyText {
              primary {
                text {
                  html
                }
              }
            }
            ... on PrismicArticlesBodyQuote {
              primary {
                quote {
                  html
                }
                cite {
                  html
                }
              }
            }
            ... on PrismicArticlesBodyCut {
              id
            }
            ... on PrismicArticlesBodyLead {
              primary {
                text {
                  html
                }
              }
            }
            ... on PrismicArticlesBodyImage {
              primary {
                imageimage {
                  url
                }
                imagecaption {
                  html
                }
              }
            }
            ... on PrismicArticlesBodyListOfArticles {
              items {
                articlelink {
                  document {
                    __typename
                    ... on PrismicArticles {
                      first_publication_date(locale: "ru", formatString: "DD MMMM YYYY")
                      fields {
                        slug
                      }
                      tags
                      href
                      data {
                        title {
                          text
                        }
                        authors {
                          author {
                            document {
                              __typename
                              ... on PrismicAuthors {
                                data {
                                  name
                                }
                              }
                            }
                          }
                        }
                        image {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on PrismicArticlesBodyMedialink {
              primary {
                mediacover {
                  url
                }
                mediacaption {
                  html
                }
                medialink {
                  url
                }
              }
            }
            ... on PrismicArticlesBodySlider {
              items {
                sliderimage {
                  url
                }
                slidercaptions {
                  html
                }
              }
            }
            ... on PrismicArticlesBodyYoutube {
              primary {
                youtubeid {
                  html
                }
                videoresource {
                  html
                }
              }
            }
            ... on PrismicArticlesBodyReference {
              primary {
                referenceanchor
                referencetext {
                  html
                }
              }
            }
            ... on PrismicArticlesBodyReferencesList {
              id
            }
          }
        }
      }
    }
  }
`

export default AfishaPage

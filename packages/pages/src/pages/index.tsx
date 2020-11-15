import React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'

import { Layout, ArticleBody } from '@krapiva-org/theme'

function IndexPage({ data, location }: any) {
  React.useEffect(() => {
    if (window !== undefined && !process.env.SPECIAL && !location.href.includes('localhost:')) {
      window.location.replace(`https://${process.env.PRISMIC_API === 'krapiva-dev' ?
        'dev-main' : 'www'}.krapiva.org`)
    }
  }, [])

  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
      seo={{
        title: get(data.prismicArticles, 'data.title.text'),
        image: get(data.prismicArticles, 'data.image'),
      }}
      pagesIndex
    >
      <ArticleBody data={data.prismicArticles} onIndex />
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
        }
      }
    }
    prismicArticles(fields: {tags: {in: ["arhiv", "specnomer"]}}) {
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
`

export default IndexPage

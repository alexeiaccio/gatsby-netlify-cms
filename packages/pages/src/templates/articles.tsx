import React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'

import { Layout, ArticleBody } from '@krapiva-org/theme'

function ArticlesPage({ data, location }: any) {
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
      seo={{
        title: get(data.prismicArticles, 'data.title.text'),
        image: get(data.prismicArticles, 'data.image'),
      }}
      blackHeader
    >
      <ArticleBody data={data.prismicArticles} />
    </Layout>
  )
}

export const PageQuery = graphql`
  query ArticlesQuery($slug: String!) {
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
              expiredate(difference: "days")
            }
          }
        }
      }
    }
    prismicArticles(fields: { slug: { eq: $slug } }) {
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
          ... on PrismicArticlesBodyListOfArticles {
            items {
              articlelink {
                document {
                  __typename
                  ... on PrismicArticles {
                    first_publication_date
                    fields {
                      slug
                    }
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
                        localFile {
                          childImageSharp {
                            fluid(maxWidth: 640, quality: 80) {
                              ...GatsbyImageSharpFluid_tracedSVG
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
          ... on PrismicArticlesBodyMedialink {
            primary {
              mediacover {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 640, quality: 80) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
              }
              mediacaption {
                html
              }
              medialink {
                url
                size
              }
            }
          }
          ... on PrismicArticlesBodySlider {
            items {
              sliderimage {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1280, quality: 80) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
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

export default ArticlesPage

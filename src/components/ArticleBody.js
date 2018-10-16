/* global tw */
import React, { Fragment, Component } from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import { PreviewCard } from './Cards'
import { HTMLContent } from './Content'
import { Column, Row } from './Grid'
import { Img } from './Img'
import { MediaLink } from './MediaLink'
import { RichText } from './RichText'
import { LeadText } from './Typography'
import { uuid } from '../utils'

import Next from '../img/next.svg'

export class ArticleBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliders: Array.from(props.article.body, () => 0),
    }
  }

  previous = count => {
    const sliderLength = this.props.article.body[count].items.length - 1
    this.setState({
      sliders: this.state.sliders.map(
        (x, i) =>
          i === count
            ? this.state.sliders[count] > 0
              ? x - 1
              : sliderLength
            : x
      ),
    })
  }

  next = count => {
    const sliderLength = this.props.article.body[count].items.length - 1
    this.setState({
      sliders: this.state.sliders.map(
        (x, i) =>
          i === count
            ? this.state.sliders[count] < sliderLength
              ? x + 1
              : 0
            : x
      ),
    })
  }

  render() {
    const { article } = this.props
    return (
      <div>
        {article.body.map(({ items, primary, __typename }, i) => (
          <Fragment key={uuid()}>
            {__typename === 'PrismicArticlesBodyImage' && (
              <figure
                className={css`
                  ${tw(['m-0'])};
                `}
                key={uuid()}
              >
                <Img src={primary.imageimage} key={uuid()} />
                <figcaption
                  className={css`
                    ${tw(['italic', 'mb-q48', 'text-center', 'text-list'])};
                  `}
                  key={uuid()}
                >
                  <HTMLContent
                    content={primary.imagecaption.html}
                    key={uuid()}
                  />
                </figcaption>
              </figure>
            )}
            {__typename === 'PrismicArticlesBodySlider' && (
              <figure
                className={css`
                  ${tw(['m-0'])};
                `}
                key={uuid()}
              >
                <div
                  className={css`
                    ${tw(['relative'])};
                  `}
                >
                  {items[this.state.sliders[i]].sliderimage.localFile && (
                    <Img
                      src={items[this.state.sliders[i]].sliderimage}
                      key={uuid()}
                    />
                  )}
                  <div
                    className={css`
                      ${tw([
                        'absolute',
                        'bg-center',
                        'bg-no-repeat',
                        'cursor-pointer',
                        'pin-b',
                        'pin-t',
                        'pin-l',
                        'w-1/2',
                      ])};
                      transform: rotateZ(180deg);
                      &:hover {
                        background-image: url(${Next});
                      }
                    `}
                    key={uuid()}
                    onClick={() => this.previous(i)}
                  />
                  <div
                    className={css`
                      ${tw([
                        'absolute',
                        'bg-center',
                        'bg-no-repeat',
                        'cursor-pointer',
                        'pin-b',
                        'pin-t',
                        'pin-r',
                        'w-1/2',
                      ])};
                      &:hover {
                        background-image: url(${Next});
                      }
                    `}
                    key={uuid()}
                    onClick={() => this.next(i)}
                  />
                </div>
                <figcaption
                  className={css`
                    ${tw([
                      'flex',
                      'flex-row',
                      'italic',
                      'justify-between',
                      'mb-q48',
                      'text-center',
                      'text-list',
                    ])};
                  `}
                  key={uuid()}
                >
                  <p>
                    <span>{this.state.sliders[i] + 1}</span>
                    <span> · </span>
                    <span>{this.props.article.body[i].items.length}</span>
                  </p>
                  <HTMLContent
                    content={items[this.state.sliders[i]].slidercaptions.html}
                    key={uuid()}
                  />
                </figcaption>
              </figure>
            )}
            {__typename === 'PrismicArticlesBodyMedialink' && (
              <MediaLink {...{ primary }} />
            )}
            {__typename === 'PrismicArticlesBodyLead' && (
              <HTMLContent
                className={css`
                  ${LeadText};
                  ${tw(['mb-q48'])};
                `}
                content={primary.text.html}
                key={uuid()}
              />
            )}
            {__typename === 'PrismicArticlesBodyText' && (
              <HTMLContent
                className={RichText}
                content={primary.text.html}
                key={uuid()}
              />
            )}
            {__typename === 'PrismicArticlesBodyListOfArticles' && (
              <Row>
                {items.map(({ articlelink }) => {
                  const article = articlelink.document[0]
                  return (
                    <Column>
                      <PreviewCard {...{ article }} key={uuid()} />
                    </Column>
                  )
                })}
              </Row>
            )}
            {__typename === 'PrismicArticlesBodyYoutube' && (
              <figure
                className={css`
                  ${tw(['m-0'])};
                `}
                key={uuid()}
              >
                <HTMLContent
                  className={css`
                    & iframe {
                      ${tw(['w-full'])};
                      height: 50vh;
                    }
                  `}
                  content={primary.youtubeid.html}
                  key={uuid()}
                />
                <figcaption
                  className={css`
                    ${tw([
                      'flex',
                      'flex-row',
                      'italic',
                      'justify-between',
                      'mb-q48',
                      'text-center',
                      'text-list',
                    ])};
                  `}
                  key={uuid()}
                >
                  <HTMLContent
                    content={primary.videoresource.html}
                    key={uuid()}
                  />
                </figcaption>
              </figure>
            )}
            {__typename === 'PrismicArticlesBodyQuote' && (
              <figure
                className={css`
                  ${tw(['m-0'])};
                `}
                key={uuid()}
              >
                <blockquote
                  className={css`
                    ${LeadText};
                    ${tw(['m-0', 'mb-q36'])};
                  `}
                  key={uuid()}
                >
                  <HTMLContent
                    className={css`
                      ${tw(['italic'])};
                      & em {
                        letter-spacing: 0.2em;
                      }
                    `}
                    content={primary.quote.html}
                    key={uuid()}
                  />
                </blockquote>
                <footer>
                  <cite>
                    <HTMLContent
                      className={css`
                        ${tw([
                          'italic',
                          'mt-q36',
                          'mb-q48',
                          'text-right',
                          'text-body',
                        ])};
                        & p {
                          ${tw(['leading-normal', 'm-0'])};
                        }
                      `}
                      content={primary.cite.html}
                      key={uuid()}
                    />
                  </cite>
                </footer>
              </figure>
            )}
          </Fragment>
        ))}
      </div>
    )
  }
}

export const articleBodyQuery = graphql`
  fragment ArticleBody on PrismicArticles {
    data {
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
                  fluid(maxWidth: 640, quality: 80) {
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
                first_publication_date
                fields {
                  slug
                }
                data {
                  title {
                    text
                  }
                  category
                  authors {
                    author {
                      document {
                        data {
                          name
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
            }
          }
        }
        ... on PrismicArticlesBodySlider {
          items {
            sliderimage {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 640, quality: 80) {
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
      }
    }
  }
`

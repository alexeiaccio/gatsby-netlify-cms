/* global tw */
import React, { Fragment, Component } from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import { ButtonOutlined } from '../components/Buttons'
import { PreviewCard } from '../components/Cards'
import { HTMLContent } from './Content'
import { Column, Row } from '../components/Grid'
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
                <Img
                  fluid={primary.imageimage.localFile.childImageSharp.fluid}
                  key={uuid()}
                />
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
                      fluid={
                        items[this.state.sliders[i]].sliderimage.localFile
                          .childImageSharp.fluid
                      }
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
              <figure
                className={css`
                  ${tw([
                    'flex',
                    'flex-col',
                    'sm:flex-row',
                    'mb-q24',
                    'm-0',
                    'sm:-mx-4',
                  ])};
                `}
                key={uuid()}
              >
                {primary.mediacover.localFile && (
                  <a
                    className={css`
                      ${tw(['flex-1', 'sm:px-q12', 'w-full', 'sm:w-1/2'])};
                    `}
                    href={primary.medialink.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Img
                      fluid={primary.mediacover.localFile.childImageSharp.fluid}
                      key={uuid()}
                    />
                  </a>
                )}
                {!primary.medialink.url.includes('.pdf') && (
                  <video
                    className={css`
                      ${tw([
                        'flex-1',
                        'sm:px-q12',
                        'mb-q8',
                        'w-full',
                        'sm:w-1/2',
                      ])};
                      height: 3rem;
                      max-height: 3rem;
                    `}
                    controls="true"
                    name="media"
                  >
                    <source src={primary.medialink.url} type="audio/mp4" />
                  </video>
                )}
                <figcaption
                  className={css`
                    ${tw([
                      'flex-1',
                      'sm:px-q12',
                      'mb-q12',
                      'w-full',
                      'sm:w-1/2',
                    ])};
                    & h3 {
                      ${tw([
                        'font-semibold',
                        'font-montserrat',
                        'mt-0',
                        'text-heading5',
                      ])};
                    }
                    & p {
                      ${tw(['my-q4', 'text-list'])};
                    }
                  `}
                  key={uuid()}
                >
                  {primary.mediacaption && (
                    <HTMLContent
                      content={primary.mediacaption.html}
                      key={uuid()}
                    />
                  )}
                  {primary.medialink.url.includes('.pdf') && (
                    <a
                      href={primary.medialink.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span
                        className={css`
                          ${ButtonOutlined};
                          ${tw(['mt-q24'])};
                        `}
                      >
                        Скачать PDF ⭳
                      </span>
                    </a>
                  )}
                </figcaption>
              </figure>
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
      }
    }
  }
`

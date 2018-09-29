/* global tw */
import React from 'react'
import { css } from 'react-emotion'

import { ButtonOutlined } from './Buttons'
import { HTMLContent } from './Content'
import { Img } from './Img'
import { uuid } from '../utils'

export const MediaLink = ({ primary }) => (
  <figure
    className={css`
      ${tw([
        'flex',
        'flex-col',
        'sm:flex-row',
        'flex-wrap',
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
        <Img src={primary.mediacover} key={uuid()} />
      </a>
    )}
    {(primary.medialink.url.includes('.mp3') ||
      primary.medialink.url.includes('.m4a')) && (
        <video
          className={css`
            ${tw(['flex-1', 'sm:px-q12', 'mb-q8', 'w-full', 'sm:w-1/2'])};
            height: 3rem;
            max-height: 3rem;
          `}
          controls="true"
          name="media"
        >
          <source src={primary.medialink.url} type="audio/mp4" />
        </video>
      )}
    {primary.medialink.url.includes('.mp4') && (
      <div
        className={css`
          ${tw(['mb-q8', 'sm:px-q16', 'text-center', 'w-full'])};
        `}
      >
        <video
          className={css`
            ${tw(['max-w-full'])};
          `}
          controls="true"
          name="media"
        >
          <source src={primary.medialink.url} type="video/mp4" />
        </video>
      </div>
    )}
    <figcaption
      className={css`
        ${tw(['flex-1', 'sm:px-q12', 'mb-q12', 'w-full', 'sm:w-1/2'])};
        ${primary.medialink.url.includes('.mp4') && tw(['text-center'])};
        & h3 {
          ${tw(['font-semibold', 'font-montserrat', 'mt-0', 'text-heading5'])};
        }
        & p {
          ${tw(['my-q4', 'text-list'])};
        }
      `}
      key={uuid()}
    >
      {primary.mediacaption && (
        <HTMLContent content={primary.mediacaption.html} key={uuid()} />
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
)

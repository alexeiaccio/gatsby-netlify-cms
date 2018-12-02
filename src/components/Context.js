/* global tw */
import React from 'react'
import { css } from 'react-emotion'

import { Placeholder, PreviewCard } from '../components/Cards'
import { Column, Row } from '../components/Grid'
import { Heading4 } from '../components/Typography'

export const Context = ({ context }) => (
  <aside
    className={css`
      ${tw(['w-full'])};
    `}
  >
    <h2
      className={css`
        ${Heading4};
        ${tw(['my-q36'])};
      `}
    >
      Читать дальше
    </h2>
    <Row>
      {context[0] && context[0].previous ? (
        <Column>
          <PreviewCard article={context[0].previous} />
        </Column>
      ) : (
        <Column
          className={css`
            ${tw(['hidden', 'sm:block'])};
          `}
        >
          <Placeholder />
        </Column>
      )}
      {context[0] && context[0].next ? (
        <Column>
          <PreviewCard article={context[0].next} />
        </Column>
      ) : (
        <Column
          className={css`
            ${tw(['hidden', 'sm:block'])};
          `}
        >
          <Placeholder />
        </Column>
      )}
    </Row>
  </aside>
)

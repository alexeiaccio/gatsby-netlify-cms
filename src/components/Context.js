import React from 'react'
import { css } from '@emotion/core'

import { Placeholder, PreviewCard } from '../components/Cards'
import { Column, Row } from '../components/Grid'
import { Heading4 } from '../components/Typography'

export const Context = ({ context }) => (
  <aside
    css={css`
      ${tw(['w-full'])};
    `}
  >
    <h2
      css={css`
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
          css={css`
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
          css={css`
            ${tw(['hidden', 'sm:block'])};
          `}
        >
          <Placeholder />
        </Column>
      )}
    </Row>
  </aside>
)

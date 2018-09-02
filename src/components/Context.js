/* global tw */
import React from 'react'
import { css } from 'react-emotion'

import { Heading4 } from '../components/Typography'
import { Dummy, Preview } from './Preview'

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
    <div
      className={css`
        ${tw(['flex', 'flex-row', 'flex-no-wrap', '-mx-4', 'w-full'])};
      `}
    >
      {context[0].previous ? (
        <Preview article={context[0].previous} />
      ) : (
        <Dummy />
      )}
      {context[0].next ? <Preview article={context[0].next} /> : <Dummy />}
    </div>
  </aside>
)

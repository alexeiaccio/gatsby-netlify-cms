import React from 'react'

import { tp } from '../utils'

export const HTMLContent = ({ content, className }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{ __html: tp.execute(content) }}
  />
)

import * as React from 'react'

interface HTMLProps {
  children: string | any
}

export const HTML = ({ children }: HTMLProps) => (
  <div dangerouslySetInnerHTML={{ __html: children }} />
)

export const SpanHTML = ({ children }: HTMLProps) => (
  <span dangerouslySetInnerHTML={{ __html: children.replace(/<\/?p/g, '<span') }} />
)
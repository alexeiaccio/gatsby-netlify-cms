import React from 'react'

export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

export const SpanHTMLContent = ({ content, className }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: content.replace(/<\/?p/g, '<span') }} />
)

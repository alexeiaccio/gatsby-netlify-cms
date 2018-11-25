import React from 'react'
import PropTypes from 'prop-types'

const TextWithReference = ({ content, contentRef, className }) => (
  <div
    className={className}
    ref={contentRef}
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

TextWithReference.propTypes = {
  content: PropTypes.node.isRequired,
  contentRef: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
}

export default TextWithReference

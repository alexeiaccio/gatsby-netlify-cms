import React, { memo } from 'react'
import PropTypes from 'prop-types'

function Content({ content, ...props }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} {...props} />
}

Content.propTypes = {
  content: PropTypes.string.isRequired,
}

export default memo(Content)

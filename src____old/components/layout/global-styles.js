import { css } from '@emotion/core'

export default css`
  body {
    ${tw(['m-0', 'font-cormorant', 'font-medium'])};
  }
  a,
  a:hover {
    ${tw(['no-underline', 'text-green-dark'])}
  }
  a.link {
    ${tw(['break-words'])}
  }
`

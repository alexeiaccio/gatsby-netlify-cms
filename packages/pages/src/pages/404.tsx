import * as React from 'react'

function WrongPath() {
  React.useEffect(() => {
    if (window !== undefined) {
      window.location.replace('https://www.krapiva.org')
    }
  }, [])

  return <div />
}

export default WrongPath

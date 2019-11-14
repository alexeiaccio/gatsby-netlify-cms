import * as React from 'react'

function WrongPath() {
  React.useEffect(() => {
    if (window !== undefined) {
      window.location.replace('https://afisha.krapiva.org')
    }
  }, [])

  return <div />
}

export default WrongPath

import * as React from 'react'
import { navigate } from 'gatsby'
import { words, get } from 'lodash'

const REDIRECTS = {
  'bubnezh-o': 'https://pervaya.krapiva.org/bubnezh-o-lokal-noi-02-09-2018',
  'chto-mi': 'https://pervaya.krapiva.org/chto-mi-vidim-01-09-2018',
  'vse-techet': 'https://pervaya.krapiva.org/vse-techet-ili-01-10-2018',
  'kak-roman': 'https://pervaya.krapiva.org/kak-roman-sergeevich-28-09-2018',
  'kak-zhit': 'https://pervaya.krapiva.org/kak-zhit-vmeste-14-09-2018',
  'prusskoe-pole': 'https://pervaya.krapiva.org/prusskoe-pole-eksperimenta-16-10-2018',
  'feministki-peterburga': 'https://pervaya.krapiva.org/feministki-peterburga-ili-24-10-2018',
}

function WrongPath({ location }) {
  React.useEffect(() => {
    if (window !== undefined) {
      const pathname = location.pathname.replace(/\//g, '')
      const regex = /\w{3}-?\w{0,3}-?\w{0,3}-?\d{2}-\d{2}-\d{4}/
      const articlePathname = regex.exec(pathname)
      const match = words(pathname)
        .slice(0, 2)
        .join('-')

      REDIRECTS[match] ?
        window.location.replace(REDIRECTS[match])
        : get(articlePathname, '0') ?
          window.location.replace(`https://pervaya.krapiva.org/${get(articlePathname, '0', '')}`)
          : navigate('/')
    }
  }, [])

  return <div />
}

export default WrongPath

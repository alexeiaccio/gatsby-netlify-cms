import * as React from 'react'
import { get } from 'lodash'

import { HTMLRef } from '../../html/index'
import { TextContainer } from '../../main/index'

import { Reference } from './reference'
import { textStyles, rightStyles, centerStyles } from './styles'

interface BodyTextProps {
  text: string
  references?: any
  label?: 'right' | 'center' | 'left' | string
}

export function BodyText({ text, references = {}, label }: BodyTextProps) {
  const textRef: any = React.useRef(null)
  let refNodes: any[] = React.useRef([]).current
  const [openedRef, toggleRef] = React.useState<any>(null)

  const handleToggle = ({ toElement }) => {
    const reference = get(references, [toElement.dataset.href, 'primary'])

    toggleRef({
      height: toElement.offsetHeight,
      left: toElement.offsetLeft,
      top: toElement.offsetTop,
      width: toElement.parentNode.offsetWidth,
      reference,
    })
  }

  const handleRefs = () => {
    if (refNodes.length) {
      for (let node of refNodes) {
        node.addEventListener('click', handleToggle)
        node.id = `reference-${node.textContent}`
      }
    }
  }

  React.useEffect(() => {
    if (textRef.current) {
      refNodes = textRef.current.querySelectorAll(
        'button[data-type="reference"]'
      )

      handleRefs()
    }

    return () => {
      if (refNodes.length) {
        for (let node of refNodes) {
          node.removeEventListener('click', handleToggle)
        }
      }
    }
  }, [textRef.current])

  const resetRef = () => {
    toggleRef(null)
  }

  React.useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', resetRef)
    }

    return () => {
      if (window !== undefined) {
        window.removeEventListener('resize', resetRef)
      }
    }
  }, [])

  const styles = React.useMemo(() => {
    if (label === 'right') {
      return [textStyles, rightStyles]
    } else if (label === 'center') {
      return [textStyles, centerStyles]
    } else {
      return [textStyles]
    }
  }, [label])

  if (!text) {
    return null
  }

  return (
    <TextContainer css={styles}>
      <HTMLRef ref={textRef}>{text}</HTMLRef>
      <Reference data={openedRef} close={resetRef} />
    </TextContainer>
  )
}

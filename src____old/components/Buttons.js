import styled from '@emotion/styled'
import { css } from '@emotion/core'

export const OutlinedTemplate = css`
  ${tw([
    'bg-white',
    'hover:bg-black',
    'inline-flex',
    'border',
    'border-black',
    'border-solid',
    'font-montserrat',
    'items-center',
    'justify-center',
    'outline-none',
    'text-black',
    'hover:text-white',
    'uppercase',
  ])};
  box-sizing: border-box;
  transition: all 200ms ease-in-out;
`

export const ButtonOutlined = css`
  ${OutlinedTemplate};
  ${tw(['px-q24', 'py-q12', 'text-sm'])};
`

export const ButtonOutlinedBlock = styled('button')`
  ${OutlinedTemplate};
  ${tw(['px-q24', 'py-q8', 'text-xs', 'w-full', 'whitespace-no-wrap'])};
  ${({ active }) =>
    active ? tw(['bg-black', 'text-white']) : tw(['cursor-pointer'])};
`

export const ButtonOutlinedDisabled = styled('button')`
  ${tw([
    'bg-black',
    'inline-flex',
    'border',
    'border-green',
    'border-solid',
    'font-montserrat',
    'items-center',
    'justify-center',
    'text-green',
    'uppercase',
  ])};
  ${tw(['px-q24', 'py-q8', 'text-xs', 'w-full', 'whitespace-no-wrap'])};
`

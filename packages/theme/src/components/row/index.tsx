import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { get } from 'lodash'

export const Row = styled.div`
  ${tw`
    flex flex-row flex-wrap
    items-start justify-between
  `};
  box-sizing: border-box;

  @media (min-width: 640px) {
    margin-right: -${props => props.gap || 0}rem;
    margin-left: -${props => props.gap || 0}rem;
  }
  ${props => props.css};
`

export const Col = styled.div`
  ${tw`
    flex
    items-start justify-center
    w-full
  `};
  flex-grow: 1;
  flex-shrink: 0;
  margin-bottom: ${props => ((get(props, 'gap', get(props, 'gaps.1')) || 1) * 2)}rem;

  @media (min-width: 640px) {
    max-width: ${props => 100 / (props.cols || 2)}%;
    padding: 0 ${props => (get(props, 'gap', get(props, 'gaps.0')) || 0) / 2}rem;
  }
`

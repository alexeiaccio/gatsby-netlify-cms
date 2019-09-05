import * as React from 'react'
import { get } from 'lodash'
import styled from '@emotion/styled'
import * as uuid from 'uuid/v1'

import { Image } from '../../../typings/image'

import { LinkButton } from '../../button/link'
import { Row, Col } from '../../row/index'
import { HTML } from '../../html/index'
import { Img } from '../../img/index'
import { TextContainer } from '../../main/index'

import { AudioTrack } from './audio'
import { VideoPlayer } from './video'
import { imageStyles, imageWrapperStyles, imgStyles, buttonStyles } from './styles'

interface MediaLinkProps {
  primary?: {
    mediacover?: Image
    mediacaption?: {
      html?: string
    }
    medialink?: {
      url?: string
      size?: string
    }
  }
}

export function MediaLink({ primary }: MediaLinkProps) {
  if (!primary) { return null; }
  const url = get(primary, 'medialink.url')
  const size = get(primary, 'medialink.size')
  const caption = get(primary, 'mediacaption.html')
  const isAudioTrack = url.includes('.mp3') || url.includes('.m4a')
  const isVideoFile = url.includes('.mp4')
  const isPDF = url.includes('.pdf')
  const Component = styled.div()
  const Wrapper = isPDF ?
    Component.withComponent('a')
    :
    Component
  let props = {}

  if (isPDF) {
    props = {
      href: url,
      rel: "noopener noreferrer",
      target: "_blank",
    }
  }


  return (
    <Row gap={1}>
      <Col
        key={uuid()}
        gap={1}
        cols={isVideoFile ? 1 : 2}
      >
        {isVideoFile && <VideoPlayer url={url} />}
        {isAudioTrack && <AudioTrack url={url} />}
        {!isVideoFile && !isAudioTrack && (
          <Wrapper css={imageWrapperStyles} {...props}>
            <div css={imageStyles}>
              <Img
                css={imgStyles}
                src={get(primary, 'mediacover')}
              />
            </div>
          </Wrapper>
        )}
      </Col>
      <Col
        key={uuid()}
        gap={1}
        cols={isVideoFile ? 1 : 2}
      >
        <TextContainer>
          <HTML>
            {caption}
          </HTML>
          {isPDF && (
            <LinkButton
              css={buttonStyles}
              href={url}
              color="#08a676"
              rel="noopener noreferrer"
              target="_blank"
            >
              Скачать PDF ↓
            </LinkButton>
          )}
        </TextContainer>
      </Col>
    </Row >
  )
}
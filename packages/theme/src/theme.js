const heading = {
  color: 'text',
  fontFamily: 'heading',
  lineHeight: '1.2',
  fontWeight: 'heading',
}

export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#0cf3ad',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#0cf',
      },
    },
    grays: [
      '#fafcfc',
      '#edefef',
      '#dae4e9',
      '#9babb4',
      '#70818a',
      '#596a73',
      '#364349',
    ],
  },
  fonts: {
    body: 'Cormorant, serif',
    heading: 'Montserrat, sans-serif',
  },
  fontSizes: ['0.75rem', '1rem', '1.25rem', '1.5rem', '1.75rem', '2rem'],
  fontWeights: {
    body: 500,
    heading: 800,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em',
  },
  styles: {
    Layout: {
      color: 'text',
      fontFamily: 'heading',
      fontSize: 1,
    },
    Header: {
      backgroundColor: 'primary',
      fontFamily: 'heading',
      color: 'background',
      fontWeight: 'bold',
      margin: '0 auto',
      maxWidth: 'max',
      padding: 3,
      width: '100%',
      a: {
        color: 'inherit',
      },
    },
    h1: {
      ...heading,
      fontSize: 1,
      fontWeight: 'body',
      color: 'grays.3',
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
    },
  },
}

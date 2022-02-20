const unit = 1;

const theme = {
  color: {
    primary: '#0052CC',
    primaryHighlight: '#0052CC',
    primaryDark: 'rgba(172, 222, 222,0.3)',
    primarySelectedBg: '#fff5de',
    primaryDisabled: '#ccc',
    primaryText: '#fff',
    primaryDisabledText: '#999',
    primaryHighlightText: '#333',
    secondary: '#0052CC',
    secondaryHighlight: '#0052CC',
    secondaryDisabled: '#ccc',
    secondaryDisabledText: '#999',
    secondaryText: '#333',
    secondaryHighlightText: '#fff',
    danger: 'rgb(213, 54, 62)',
    dangerHighlight: 'rgb(245, 71, 80)',
    dangerDisabled: 'rgb(249, 202, 204)',
    dangerText: '#f3f3f3',
    dangerHighlightText: '#fff',
    success: 'rgb(38, 206, 136)',
    successHighlight: 'rgb(57, 226, 156)',
    successDisabled: 'rgb(181, 234, 212)',
    successText: '#f3f3f3',
    successHighlightText: '#fff',
    background: 'rgb(242, 243, 248)',
    backgroundDark: 'rgb(45, 52, 70)',
    contentBackground: '#fff',
    border: '#cccccc',
    horizontalLine: '#e8e8e8'
  },
  unit,
  fonts: {
    fontFamily: 'Roboto, sans-serif',
    size: {
      h1: '48px',
      h2: '36px',
      h3: '24px',
      h4: '20px',
      h5: '14px',
      h6: '11px',
      p: '13px',
      small: '9px'
    },
    margin: {
      h1: '50px 0 50px 0',
      h2: '40px 0 30px 0',
      h3: '30px 0 20px 0',
      h4: '10px 0 8px 0',
      h5: '8px 0 8px 0',
      h6: '7px 0 8px 0',
      p: '5px 0 2px',
      small: '2px 0'
    },
    color: {
      h1: '#1a1a1a',
      h2: '#1a1a1a',
      h3: '#1a1a1a',
      h4: '#1a1a1a',
      h5: '#1a1a1a',
      h6: '#1a1a1a',
      p: '#545454',
      small: '#545454'
    },
    fontWeight: {
      h1: 100,
      h2: 100,
      h3: 100,
      h4: 100,
      h5: 100,
      h6: 100,
      p: 100,
      small: 100
    }
  },
  measurements: {
    padding: 20 * unit,
    contentPadding: 50 * unit,
    loading: {
      width: 100 * unit,
      height: 100 * unit
    }
  },
  media: {
    xs: 400,
    sm: 700,
    md: 900,
    lg: 1050
  },
  images: {
    login_logo: process.env.REACT_APP_LOGIN_LOGO,
    login_logo2: process.env.REACT_APP_LOGIN_APP_LOGO,
    bg_img: process.env.REACT_APP_BACKGROUND_IMAGE_URI
  }
};

theme.flexa = {
  columns: 12,
  gutter: {
    xs: 2,
    sm: 2,
    md: 4,
    lg: 4
  },
  breakpoints: {
    xs: 0,
    sm: 50,
    md: 60,
    lg: 70
  }
};

export default theme;

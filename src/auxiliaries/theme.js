import { createTheme, responsiveFontSizes } from "@mui/material"
import { huHU } from '@mui/material/locale';
import { grey } from '@mui/material/colors';

import NotoSansSCCustom from '../fonts/MyFontRegular.woff2'

const baseTheme = responsiveFontSizes(
    createTheme({
  typography: {
    
    // h1 is used for the keyword
    h1: {
      fontFamily: "'Sitka Heading', serif",
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 55,
    },

    // h2 is used for the LessonStartPage title text
    h2: {
      fontFamily: "'Sitka Heading', serif",
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 40,
    },

    // h3 is used for the charChinese
    h3: {
      fontFamily: "NotoSansSCCustom",
      fontSize: 95,
    },

    // h4 is used for the titles before CharacterCard segments
    h4: {
      // fontFamily: "'Roboto', sans-serif",
      fontWeight: 'bold',
      fontSize: 13
    },

    // h5 is used for the LessonStartPage lesson number
    h5: {
      // fontFamily: "'Roboto', sans-serif",
      fontWeight: 'bold',
      fontSize: 16
    },

    pinyin: {
      fontFamily: "'Sitka Heading', serif",
      fontStyle: 'italic',
      fontSize: 18
    },

    headerThemeText: {
      // fontFamily: "'Roboto', sans-serif",
      fontSize: 14
    },

    detailsItemChinese: {
      fontFamily: 'NotoSansSCCustom',
      fontSize: 20,
    },

    detailsItemPinyin: {
      fontFamily: "'Sitka Heading', serif",
      fontStyle: 'italic',
      fontSize: 14,
    },

    detailsItem: {
      fontSize: 16,
    },

    detailsItemPrimitive: {
      fontSize: 14,
    },

    lessonStartPaperItemChinese: {
      fontFamily: 'NotoSansSCCustom',
      fontSize: 24,
    },

    primitiveMeaning: {
      fontSize: 18,
      fontWeight: 'bold'
    },

    recapPinyin: {
      fontFamily: "'Sitka Heading', serif",
      fontStyle: 'italic',
      fontSize: 13
    },

    recapChinese: {
      fontFamily: 'NotoSansSCCustom',
      fontSize: 32
    },

    recapPrimitive: {
      fontSize: 14,
      fontWeight: 'bold'
    },

    lessonSelectNumber: {
      fontSize: 13,
      fontWeight: 'bold'
    },

    lessonSelectTitle: {
      fontFamily: "'Sitka Heading', serif",
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 20,
      lineHeight: 1.2
    },

    lessonSelectTier: {
      fontFamily: "'Sitka Heading', serif",
      fontSize: 13
    },

    mainPagePrimaryHeading: {
      fontFamily: "'Montserrat', serif",
      fontSize: 60,
      lineHeight: 1.2
    },

    mainPageSecondaryHeading: {
      fontFamily: "'Montserrat', serif",
      fontSize: 36,
      fontWeight: 900,
      lineHeight: 1.3
    },

    mainPageText: {
      fontSize: 16
    },

    // caption is used for the headings in "ListHeading"
    caption: {
      fontWeight: 'bold',
      lineHeight: '100%'
    },

    topbarLogoText: {
      fontFamily: "'Montserrat', serif",
      fontSize: 18,
      fontWeight: 900
    },
    accentSemiBold: {
      fontFamily: "'Montserrat', serif",
      fontSize: 18,
      fontWeight: 600
    },
    fontFamily: "'Noto Sans', sans-serif"
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: 
      `
        @font-face {
          font-family: 'NotoSansSCCustom';
          font-display: swap;
          src: local('NotoSansSCCustom'), url(${NotoSansSCCustom}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+4E00-0+9FFF, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,    
    }
  }
},
huHU))

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    type: 'dark',
    primary: {
      main: '#2f99f3',
      inactiveOnMain: '#343434',
      light: grey[700],
      // appbarBottomBorder: '#323232',
      link: '#2a3eb1',
      lowPrioText: grey[700],
      lowPrioSidebarText: grey[700],
      detailsElementText: grey[500],
      contrastHeader: '#637bfe',
      contrastText: '#eeeeff',
      lightPrimitive: '#ff5656',
      lessonCardNonexistentTierInactive: '#343434',
      lessonCardExistingTierInactive: '#999999',
      topbarBackground: '#111111',
      topbarButton: '#666666'
    },
    secondary: {
      main: '#f39237',
      light: '#EE994A',
      veryLight: '#FFC48D',
      unknownCharacter: grey[800], 
      veryCommonCharacter: '#d03738', 
      quiteCommonCharacter: '#d85f36', 
      commonCharacter: '#d17f36', 
      uncommonCharacter: '#d7af1f', 
      rareCharacter: grey[700], 
      veryRareCharacter: grey[800] 
    },
    tertiary: {
      main: '#cf2474',
      light: '#E71979',
    },
    background: {
      default: '#161616',
      paper: '#232323',
      tagline: '#1c1c1c',
      taglineSecondary: '#191919',
      taglineArrowBG: '#161616',
      lessonStartPaper: '#191919',
      tooltip: '#111111',
      // lessonCard: '#1f1f1f',
      // lessonCardHover: '#2f2f2f',
      // lessonCardInactive: '#131313',
      tierOneChar: '#232323',
      tierTwoChar: '#343434',
      tierThreeChar: '#454545',
      tierFourChar: '#565656',
      remainderChar: '#888888',
      charSelectAdmin: '#343427',
      dataGridEdited: '#38423E'
    },
    text: {
      primary: '#ffffff'
    },
    divider: '#323232',
    // storyKeyword: '#637bfe',
    // storyPrimitive: '#ee4545'
  },
  components: {
    ...baseTheme.components,
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#666666',
        },
        root: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#637bfe',
          }
        },
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#666666',
        '&.Mui-focused': {
            color: '#637bfe',
            }  
          }
        },
      },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#777777'
        }
      }
    }
  }
})

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    type: 'light',
    primary: {
      main: '#066CD9',
      inactiveOnMain: '#545D88',
      // light: '#6879C8',
      // dark: '#005697',
      // appbarBottomBorder: '#484998',
      link: '#2a3eb1',
      lowPrioText: grey[600],
      lowPrioSidebarText: '#7E7D77',
      detailsElementText: '#5C5B57',
      contrastHeader: '#e3c024',
      // contrastText: '#eeeeff',
      lightPrimitive: '#DA3838',
      lessonCardNonexistentTierInactive: '#5C5B57',
      lessonCardExistingTierInactive: '#dadada',
      topbarBackground: '#eeeeee',
      topbarButton: '#888888'
    },
    secondary: {
      main: '#f39237',
      // light: '#ffaa5b',
      veryLight: '#FFC48D',
      unknownCharacter: grey[500], 
      veryCommonCharacter: '#d03738', 
      quiteCommonCharacter: '#D26836', 
      commonCharacter: '#D17F36', 
      uncommonCharacter: '#D7AF1F', 
      rareCharacter: grey[700], 
      veryRareCharacter: grey[500] 
    },
    tertiary: {
      main: '#bf1363',
      light: '#D50C6A',
    },
    text: {
      primary: '#191923'
    },
    grey: {
      50: '#F7FaF5',
      100: '#F4F7F1',
      200: '#f0f0f0',
      300: '#e3e3e3',
    },
    background: {
      default: '#f9f9f9',
      tagline: '#ffffff',
      taglineSecondary: '#f0f0e9',
      taglineArrowBG: '#ededed',
      lessonStartPaper: '#1E2764',
      lessonStartPaperBorder: '#101740',
      tooltip: '#454545',
      // lessonCard: '#212c6f',
      // lessonCardHover: '#282f7f',
      // lessonCardInactive: '#93948b',
      tierOneChar: '#ffffff',
      tierTwoChar: '#ededed',
      tierThreeChar: '#cccccc',
      tierFourChar: '#aaaaaa',
      remainderChar: '#888888',
      charSelectAdmin: '#f6f5e7',
      dataGridEdited: '#CDE3D9'
    },
    divider: '#e0e3da',
    // storyKeyword: '#303f9f',
    // storyPrimitive: '#C92020'
  },
  components: {
    ...baseTheme.components,
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#F0F3ea',
        },
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#303f9f',
            }
        }
      }
    },
  }
})

export { darkTheme, lightTheme }
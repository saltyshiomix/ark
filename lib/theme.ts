/** @format */

import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2c4373',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    /*
    action: {
      active: 'rgba(44, 67, 115, 0.54)',
      hover: 'rgba(44, 67, 115, 0.84)',
      hoverOpacity: 0.84,
      selected: 'rgba(44, 67, 115, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    */
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiOutlinedInput: {},
    MuiCheckbox: {
      root: {
        color: '#2c4373',
      },
    },
    MuiFormLabel: {
      root: {
        color: 'rgba(44, 67, 115, 0.7)',
      },
    },
    MuiInputBase: {
      root: {
        borderColor: 'rgba(44, 67, 115, 0.7)',
      },
    },
    MuiCard: {
      root: {},
    },
    MuiCardContent: {
      root: {
        'padding': '8px 46px 8px 46px',
        '&:last-child': {
          paddingBottom: 8,
        },
      },
    },
    MuiButton: {
      outlinedPrimary: {
        'color': '#fff',
        'backgroundColor': '#2c4373',
        '&:hover': {
          color: '#2c4373',
        },
      },
    },
  },
});

export default theme;

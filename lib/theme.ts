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
    MuiOutlinedInput: {
      root: {
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(44, 67, 115, 0.9)',
        },
      },
      notchedOutline: {
        'borderColor': 'rgba(44, 67, 115, 0.5)',
        'borderWidth': 2,
        '&$disabled': {
          borderColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
    },
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
        '&:disabled': {
          color: 'rgba(0, 0, 0, 0.5)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
  },
});

export default theme;

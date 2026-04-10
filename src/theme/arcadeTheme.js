import { createTheme } from '@mui/material/styles';

const arcadeTheme = createTheme({
  palette: {
    mode: 'dark', // Fondo oscuro
    primary: {
      main: '#ff00ff', // Magenta neón
    },
    secondary: {
      main: '#00ffff', // Cyan neón
    },
    background: {
      default: '#0a0f12', // Negro profundo
      paper: '#1a1a2e',   // Azul medianoche para tarjetas
    },
    text: {
      primary: '#00ffff',
      secondary: '#f0f0f0',
    },
    // Colores personalizados (los puedes usar en tus componentes)
    arcade: {
      magenta: '#ff00ff',
      cyan: '#00ffff',
      yellow: '#ffff00',
      green: '#00ff66',
      red: '#ff3300',
      black: '#0a0f12',
      white: '#f0f0f0',
    },
  },
  typography: {
    fontFamily: '"Press Start 2P", "Courier New", monospace',
    fontSize: 14,
    button: {
      textTransform: 'none', // Evita mayúsculas automáticas
    },
  },
  components: {
    // Personalización global de TextField
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.arcade.cyan,
              borderWidth: '2px',
              borderStyle: 'dotted',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.arcade.magenta,
              boxShadow: `0 0 8px ${theme.palette.arcade.magenta}`,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.arcade.yellow,
              borderWidth: '3px',
              boxShadow: `0 0 12px ${theme.palette.arcade.yellow}`,
            },
          },
          '& .MuiInputLabel-root': {
            color: theme.palette.arcade.cyan,
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.75rem',
            '&.Mui-focused': {
              color: theme.palette.arcade.yellow,
            },
          },
          '& .MuiInputBase-input': {
            color: theme.palette.arcade.white,
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.8rem',
          },
        }),
      },
    },
    // Opcional: Botones con estilo arcade
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: theme.typography.fontFamily,
          border: `2px dotted ${theme.palette.arcade.magenta}`,
          color: theme.palette.arcade.cyan,
          '&:hover': {
            border: `2px dotted ${theme.palette.arcade.yellow}`,
            boxShadow: `0 0 8px ${theme.palette.arcade.magenta}`,
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.arcade.cyan,
            borderWidth: '2px',
            borderStyle: 'dotted',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.arcade.magenta,
            boxShadow: `0 0 8px ${theme.palette.arcade.magenta}`,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.arcade.yellow,
            borderWidth: '3px',
            boxShadow: `0 0 12px ${theme.palette.arcade.yellow}`,
          },
          '& .MuiSelect-select': {
            color: theme.palette.arcade.white,
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.8rem',
            padding: '12px 14px',
          },
          '& .MuiSvgIcon-root': { // Flecha del desplegable
            color: theme.palette.arcade.cyan,
            '&:hover': {
              color: theme.palette.arcade.magenta,
            },
          },
        }),
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem',
          color: theme.palette.arcade.cyan,
          backgroundColor: theme.palette.background.paper,
          '&:hover': {
            backgroundColor: theme.palette.arcade.magenta,
            color: theme.palette.arcade.black,
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.arcade.yellow,
            color: theme.palette.arcade.black,
            '&:hover': {
              backgroundColor: theme.palette.arcade.green,
            },
          },
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.arcade.cyan,
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem',
          '&.Mui-focused': {
            color: theme.palette.arcade.yellow,
          },
        }),
      },
    },

    MuiList: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          border: `2px dotted ${theme.palette.arcade.magenta}`,
          boxShadow: `0 0 10px ${theme.palette.arcade.magenta}`,
        }),
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          border: `2px dotted ${theme.palette.arcade.cyan}`,
        }),
      },
    },
  },
});

export default arcadeTheme;
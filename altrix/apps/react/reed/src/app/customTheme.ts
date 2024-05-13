import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: 'hsl(0, 77%, 56%)',
        },
        secondary: {
            main: 'hsl(0, 3%, 10%)',
        },

        text: {
            primary: 'hsla(0, 0%, 50%, 1)',
            secondary: 'hsl(0, 77%, 56%)',
        },
    },
});

import { css } from '@emotion/react';

const GlobalStyle = (theme) => css`
    :root {
        --color-primary: ${theme.colors.primary};
        --color-primary-hover: ${theme.colors.primaryHover};
        --color-black: ${theme.colors.black};
        --color-white: ${theme.colors.white};
        --color-border: ${theme.colors.border};
        --color-header: ${theme.colors.header};
        --color-card: ${theme.colors.card};
        --color-background: ${theme.colors.background};
        --font-xl: ${theme.fonts.xl};
        --font-lg: ${theme.fonts.lg};
        --font-md: ${theme.fonts.md};
        --font-sm: ${theme.fonts.sm};
        --radius-md: ${theme.radius.md};
        --radius-lg: ${theme.radius.lg};
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        color: var(--color-black);
        background-color: var(--color-background);
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
    }

    button,
    input {
        font: inherit;
    }
`;

export default GlobalStyle;

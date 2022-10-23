import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  :root{
    // Layout & Space

    --button-gap: 0; // How much space between buttons?

    --space-base-unit: 1rem; // 16px
    --space-base-unit-2x: calc(var(--space-base-unit) * 2); // 32px
    --space-base-unit-4x: calc(var(--space-base-unit) * 4); // 64px
    --space-base-unit-6x: calc(var(--space-base-unit) * 6); // 96px
    --space-base-unit-8x: calc(var(--space-base-unit) * 8); // 128px

    --space-primary-unit-sm: var(--space-base-unit-4x);
    --space-primary-unit-md: var(--space-base-unit-6x);
    --space-primary-unit-lg: var(--space-base-unit-8x);

    // Color Palettes

    // Teenage Engineering OP-1 Guide Monochrome
    --cp-monochrome-light: #e5e5e5;
    --cp-monochrome-dark: #4d4d4d;
    --cp-monochrome-text: #b2b2b2;

    // Teenage Engineering Website Colors
    --cp-te-blue: rgb(0, 113, 187);
    --cp-te-green: rgb(3 193 75);
    --cp-te-orange: rgb(240, 90, 36);

  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    background-color: var(--cp-monochrome-dark);
  }

  * {
    box-sizing: border-box;
  }

  body {
    padding: 20px;
  }
`;

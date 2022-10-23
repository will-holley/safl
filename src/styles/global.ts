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
    --cp-te-blue: rgb(35, 174, 255);
    --cp-te-green: rgb(23, 180, 83);
    --cp-te-orange: rgb(240, 90, 36);
    --cp-te-white: white;

    // OP-1 OS Colors (Incomplete)
    // Source: https://teenage.engineering/products/op-1/original/modules
    --cp-os-blue:#698eff;
    --cp-os-green:#01ed96;
    --cp-os-white: #f1f1f1;
    --cp-os-red:#ff3a5d;
    --cp-os-purple: #9256d7;

    // Colors

    --color-board: var(--cp-monochrome-light);
    --color-details: var(--cp-monochrome-dark);
    --color-btn-press-feedback: var(--cp-te-orange);

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

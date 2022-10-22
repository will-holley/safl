import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  :root{
    --color-gray: rgb(229, 229, 229);
    --color-black: rgb(15, 14, 18);
    --color-white: white;
    --color-blue: rgb(0, 113, 187);
    --color-green: rgb(3 193 75);
    --color-orange: rgb(240, 90, 36);
    // "OP-1" text
    --color-dark-gray: gray;

    --color-gray-cool: #d8dbe3;

    // Pulling dimensions from https://codepen.io/liva_raita/pen/zYxpLjJ
    --dim-case-height: 452px;
    --dim-case-length: 1256px;

    --button-border-radius: 4px;

    --dim-unit-1: 64px;
    --dim-unit-2: 98px;
    --dim-unit-3: 132px;

    --dim-sm-square-height: var(--dim-unit-1);
    --dim-sm-square-width: var(--dim-unit-1);

    --dim-lg-square-height: var(--dim-unit-3);
    --dim-lg-square-width: var(--dim-unit-3);

    --dim-key-white-height: var(--dim-unit-3);
    --dim-key-white-width: var(--dim-unit-1);

    --dim-key-black-height: var(--dim-sm-square-height);
    --dim-key-black-short-width: var(--dim-sm-square-width);
    --dim-key-black-long-width: var(--dim-unit-2);
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  body {
    padding: 20px;
  }
`;

import { css } from '@emotion/react';
import { FC } from 'react';

const footerStyle =
  css`
    height: 6rem;
    border-top: 1px solid #ddd;
  `;

export const Footer: FC = () => <footer css={footerStyle}>footer</footer>;

import { css } from '@emotion/react';
import { FC } from 'react';

const footerStyle = css`
  height: 4rem;
  border-top: 1px solid #ddd;
`;

export const Footer: FC = () => <footer css={footerStyle}>footer</footer>;

import { css } from '@emotion/react';
import { FC } from 'react';

import { useAppSelector, logoStateSelector } from '../../store';

// TODO: Theme の検討
// TODO: StyleLint
const logoStyle = (rate: number) =>
  css`
    width: max(240px, 100%);
    font-size: 0.8rem;
    font-family: 'Courier New', Monospace;
    line-height: 0.8rem;
    margin: 2rem 0;
    text-align: center;
    white-space: pre;
    transform: scale(${rate});
  `;

type LogoParams = {
  scale?: number;
};

export const Logo: FC<LogoParams> = ({ scale = 1 }) => {
  const logo = useAppSelector(logoStateSelector);
  return <pre css={logoStyle(scale)}>{logo}</pre>;
};

Logo.defaultProps = {
  scale: 1,
};

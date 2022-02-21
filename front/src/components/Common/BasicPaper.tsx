import { css } from '@emotion/react';
import { Paper } from '@mui/material';
import { FC } from 'react';
import type { ReactNode } from 'react';

type BasicPaperProp = {
  customCSS?: ReturnType<typeof css>;
  children: ReactNode;
};

// TODO: Theme の検討 ...
const paperStyle = (customCSS: BasicPaperProp['customCSS']) =>
  css`
    padding: 1rem;
    ${customCSS};
  `;

export const BasicPaper: FC<BasicPaperProp> = ({ customCSS, children }) => (
  <Paper css={paperStyle(customCSS)}>{children}</Paper>
);

BasicPaper.defaultProps = {
  customCSS: undefined,
};

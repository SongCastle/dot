import { Box } from '@mui/material';
import { FC } from 'react';
import type { ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

type AppProp = {
  children: ReactNode;
};

export const App: FC<AppProp> = ({ children }) => (
  <>
    <Header />
    <Box
      sx={{
        width: 'min(90%, 960px)',
        height: 'max(0px, 75vh)',
        m: 'auto',
      }}
    >
      {children}
    </Box>
    <Footer />
  </>
);

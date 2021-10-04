import React from 'react';

import { Main } from './Main';

const Header : React.FC = () => {
  return (
    <header className="border h-24">header</header>
  );
};

const Footer : React.FC = () => {
  return (
    <footer className="border h-24">footer</footer>
  );
};

export const Top : React.FC = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

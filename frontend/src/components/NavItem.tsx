import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const NavItem: React.FC<Props> = ({ children }) => {
  return <li>{children}</li>;
};

export default NavItem;

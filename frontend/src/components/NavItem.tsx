import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const NavItem: React.FC<Props> = ({ children }) => {
  return <li className="my-3">{children}</li>;
};

export default NavItem;

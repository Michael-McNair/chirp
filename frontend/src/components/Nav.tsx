import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import { User } from '../sharedTypes';
import Icon from './Icon';

import { useEffect, useRef, ReactNode, useState } from 'react';

type ResizeCallback = (width: number) => void;

type ResizeAwareDivProps = {
  onResize: ResizeCallback;
  children: ReactNode;
  className: string;
};

const ResizeAwareDiv: React.FC<ResizeAwareDivProps> = ({
  onResize,
  children,
  className,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        onResize(width);
      }
    });

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [onResize]);

  return (
    <div ref={divRef} className={className}>
      {children}
    </div>
  );
};

// Usage:

export default function Nav(props: { user: User }) {
  const [navWidth, setNavWidth] = useState(0);

  return (
    <ResizeAwareDiv
      className="h-screen w-56"
      onResize={(width) => setNavWidth(width)}
    >
      <div className="w-full h-0"></div>

      <nav
        className="flex flex-col justify-stretch fixed h-[calc(100%-4rem)] my-8 p-7 rounded-md bg-slate-50 shadow-sm"
        style={{ width: `${navWidth}px` }}
      >
        <ul className="h-full flex flex-col justify-between ">
          <NavItem>
            <Link to="/home">Home</Link>
          </NavItem>
          <NavItem>Explore</NavItem>
          <NavItem>Notifications</NavItem>
          <NavItem>Messages</NavItem>
          <NavItem>Bookmarks</NavItem>
          <NavItem>Chirp Blue</NavItem>
          <NavItem>Profile</NavItem>
          <NavItem>More</NavItem>
          <Link to="/post" className="text-2xl">
            Post
          </Link>
        </ul>

        <div className="mt-7 flex items-center gap-2">
          <Icon userName={props.user.name} size={10} color={props.user.color} />

          <h3 className="text-xl">{props.user.name}</h3>
        </div>
      </nav>
    </ResizeAwareDiv>
  );
}

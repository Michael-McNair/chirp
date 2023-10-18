import { ReactNode } from 'react';

export default function Popup(props: { shown: boolean; children: ReactNode }) {
  return (
    <div
      className={`${
        props.shown ? 'block' : 'hidden'
      } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 shadow-md rounded-md p-10 pointer-events-auto w-5/6 sm:w-[50%] z-20`}
    >
      {props.children}
    </div>
  );
}

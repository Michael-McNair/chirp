export default function Popup(props: {
  textContent: string;
  shown: boolean;
  setPopupShown: any;
}) {
  return (
    <div
      className={`${
        props.shown ? 'block' : 'hidden'
      } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 shadow-md rounded-md p-10 z-10`}
    >
      <button
        className="w-10 h-10 relative mb-3"
        onClick={() => props.setPopupShown(false)}
      >
        <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 rotate-45"></div>
        <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 -rotate-45"></div>
      </button>

      <h2 className="text-center text-4xl mb-10 whitespace-nowrap">
        {props.textContent}
      </h2>

      <button
        className="bg-black text-white p-3 text-3xl w-full"
        onClick={() => props.setPopupShown(false)}
      >
        Close
      </button>
    </div>
  );
}

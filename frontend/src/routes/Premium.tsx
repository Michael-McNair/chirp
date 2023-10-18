import { useState } from 'react';

import treasure from '../images/treasure.svg';
import Popup from '../components/Popup';

export default function Premium() {
  const [popupShown, setPopupShown] = useState(false);

  return (
    <div className="w-full p-6 md: h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 lg:gap-15 items-center">
        <div className="flex-1 flex justify-center items-center md:justify-start">
          <div>
            <h5 className="font-bold text-md md:text-lg">Go Premium</h5>
            <h2 className="text-3xl md:text-4xl font-semibold mb-5 whitespace-nowrap">
              Benefits of Premium
            </h2>
            <ul className="flex flex-col list-disc gap-3 translate-x-7 md:translate-x-8 mb-8">
              <li className="text-xl text-slate-600 md:text-2xl">
                Bigger Upload Size
              </li>
              <li className="text-xl text-slate-600 md:text-2xl">
                Algorithm Priority
              </li>
              <li className="text-xl text-slate-600 md:text-2xl">
                Experience no Advertisements
              </li>
            </ul>
            <button
              className="bg-black md:text-lg font-semibold rounded-full text-slate-50 py-4 px-6 hover:opacity-70"
              onClick={() => {
                setPopupShown(true);
              }}
            >
              Go Premium for 11$ a month
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img
            src={treasure}
            alt="treasure"
            className="w-full max-w-sm md:max-w-xl"
          />
        </div>
      </div>
      <Popup shown={popupShown}>
        <button
          className="w-10 h-10 relative mb-3"
          onClick={() => setPopupShown(false)}
        >
          <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 rotate-45"></div>
          <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 -rotate-45"></div>
        </button>

        <h2 className="text-center text-4xl mb-10 whitespace-nowrap">
          Feature is not implemented yet
        </h2>

        <button
          className="bg-black text-white p-3 text-3xl w-full"
          onClick={() => setPopupShown(false)}
        >
          Close
        </button>
      </Popup>
    </div>
  );
}

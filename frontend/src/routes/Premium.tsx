import treasure from '../images/treasure.svg';

export default function Premium() {
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
            <button className="bg-black md:text-lgfont-semibold rounded-full text-slate-50 py-4 px-6 hover:opacity-70">
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
    </div>
  );
}
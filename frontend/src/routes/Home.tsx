import ForYou from '../components/ForYou.tsx';
import Following from '../components/Following.tsx';

interface Props {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

export default function Home({ page, setPage, id }: Props) {
  return (
    <div className="w-full">
      <div className="flex">
        <div className="h-12 flex-1 flex justify-center relative">
          <button
            className="text-xl h-full w-full duration-150 hover:bg-slate-200"
            onClick={() => setPage('for-you')}
          >
            For you
          </button>
          {page === 'for-you' && (
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-3 h-1 bg-blue-600"></div>
          )}
        </div>
        <div className="h-12 flex-1 flex justify-center relative">
          <button
            className="text-xl h-full w-full duration-150 hover:bg-slate-200"
            onClick={() => setPage('following')}
          >
            Following
          </button>
          {page === 'following' && (
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-3 h-1 bg-blue-600"></div>
          )}
        </div>
      </div>
      <section className="py-2 px-4">
        {page === 'for-you' && <ForYou />}
        {page === 'following' && <Following id={id} />}
      </section>
    </div>
  );
}

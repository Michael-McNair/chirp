import ForYou from '../components/ForYou.tsx';
import Following from '../components/Following.tsx';

interface Props {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  following: string[];
}

export default function Home({ page, setPage, following }: Props) {
  return (
    <div className="w-full">
      <div className="flex">
        <button
          className="text-xl flex-1 h-12 duration-150 hover:bg-slate-200"
          onClick={() => setPage('for-you')}
        >
          For you
        </button>
        <button
          className="text-xl flex-1 h-12 duration-150 hover:bg-slate-200"
          onClick={() => setPage('following')}
        >
          Following
        </button>
      </div>
      <section className="py-2 px-4">
        {page === 'for-you' && <ForYou />}
        {page === 'following' && <Following following={following} />}
      </section>
    </div>
  );
}

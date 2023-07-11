import ForYou from '../components/ForYou.tsx';
import Following from '../components/Following.tsx';

interface Props {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  following: string[];
}

export default function Home({ page, setPage, following }: Props) {
  return (
    <div className="w-full px-4">
      <div className="flex justify-evenly">
        <button onClick={() => setPage('for-you')}>For you</button>
        <button onClick={() => setPage('following')}>Following</button>
      </div>
      <section>
        {page === 'for-you' && <ForYou />}
        {page === 'following' && <Following following={following} />}
      </section>
    </div>
  );
}

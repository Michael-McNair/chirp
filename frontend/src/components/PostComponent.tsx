import Icon from './Icon.tsx';

import { Link } from 'react-router-dom';

import { Post } from '../sharedTypes.tsx';

export default function PostComponent(props: { post: Post }) {
  const { post } = props;

  function formatTimeAgo(timestamp: string) {
    const now = new Date();
    const createdAt = new Date(timestamp);

    const timeDifference = now.getTime() - createdAt.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30.44); // Approximate number of days in a month
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years}y`;
    } else if (months > 0) {
      return `${months}mo`;
    } else if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  }

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 justify-start">
          <Icon
            size={12}
            color={post.createdBy.color}
            name={post.createdBy.name}
          />
          <Link to={`/home/user/${post.createdBy._id}`}>
            <h4 className="text-xl sm:text-2xl">{post.createdBy.name}</h4>
          </Link>
        </div>
        <h3 className="text-md sm:text-lg text-slate-500">
          {formatTimeAgo(post.createdAt)}
        </h3>
      </div>
      <h2 className="text-lg sm:text-xl mt-2 sm:mt-3 break-words">
        {post.textContent}
      </h2>
    </div>
  );
}

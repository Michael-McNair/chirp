import Icon from './Icon.tsx';
import Name from './Name.tsx';

import { Post } from '../sharedTypes.tsx';

export default function PostComponent(props: { post: Post }) {
  const { post } = props;

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-3 justify-start">
        <Icon
          size={12}
          color={post.createdBy.color}
          name={post.createdBy.name}
        />
        <Name
          name={post.createdBy.name}
          _id={post.createdBy._id}
          className={'text-xl sm:text-2xl'}
        />
      </div>
      <h2 className="text-lg sm:text-xl mt-2 sm:mt-3">{post.textContent}</h2>
    </div>
  );
}

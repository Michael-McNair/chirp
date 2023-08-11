import Icon from './Icon.tsx';
import Name from './Name.tsx';

import { Post } from '../sharedTypes.tsx';

export default function PostComponent(props: { post: Post }) {
  const { post } = props;

  return (
    <div key={post._id} className="mb-6">
      <div className="flex items-center gap-3 justify-start">
        <Icon
          size={12}
          color={post.createdBy.color}
          userName={post.createdBy.name}
        />
        <Name
          name={post.createdBy.name}
          _id={post.createdBy._id}
          className={'text-2xl'}
        />
      </div>
      <h2 className="text-xl mt-3">{post.textContent}</h2>
    </div>
  );
}

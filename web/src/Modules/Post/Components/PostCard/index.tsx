// DISPLAY(HOME|PRODUCTS) PAGES
import { useRouter } from "next/router";
import getConfig from "next/config";

import { useCurrentUser } from "~/src/Modules/Auth/Hooks/useCurrentUser";
import PostCardBase from "./PostCardBase";

const { publicRuntimeConfig: Config } = getConfig();

interface PostCardProps {
  post?: IPost;
  authed?: boolean;
}
export const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  return (
    <PostCardBase
      image={
        post.images?.[0]?.fileMeta?.thumbnailUri ||
        post.images?.[0]?.fileMeta?.uri
      }
      title={post.title}
      date={post?.postDate}
      snippets={post?.snippets}
    />
  );
};

export default PostCard;

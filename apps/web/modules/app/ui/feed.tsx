//  Components
import { UserPost } from "@/modules/user/ui/user-post";

// Utils
// import { Post } from "../lib/definitions";
// import { getPosts } from "../lib/services/posts-services";

export async function Feed() {
  // let posts: Post[];

  // try {
  //   posts = await getPosts();
  // } catch (error) {
  //   console.error("Error fetching posts:", error);
  //   return <p>Error loading posts. Please try again later.</p>;
  // }

  return (
    <ul className="space-y-6">
      <li key={"post.id"}>
        <UserPost
          id={"post.id"}
          title={"post.title"}
          content={"post.content"}
          author={"post.author"}
          authorImage={"post.authorImage"}
          createdAt={"post.createdAt"}
        />
      </li>
    </ul>
  );
}

import { MotionDiv } from "@/components/framer/framerdiv";
import { PostCard } from "@/components/post-card";
import { POST_URL } from "@/lib/constants";
import { Post } from "@/types/global";

export default async function ExplorePage() {
  let response = await fetch(POST_URL, {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  let resultDict = await response.json();
  let posts: Post[] = resultDict.result;
  posts.sort(function (a, b) {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="flex align-middle justify-center">
      <div className="flex flex-col w-3/4">
        <div className="flex flex-row align-text-bottom">
          <h1 className="text-2xl md:text-4xl font-bold mt-8 text-gray-800 dark:text-gray-100">
            Explore all posts
          </h1>
          {posts.length > 1 ? (
            <span className="my-4 italic text-gray-500 ml-auto">
              {posts.length} posts
            </span>
          ) : posts.length === 1 ? (
            <span className="my-4 italic text-gray-500 ml-auto">
              {posts.length} post
            </span>
          ) : (
            <span className="my-4 italic text-gray-500 ml-auto">No posts</span>
          )}
        </div>
        <div className="flex w-full mb-24">
          <div className="flex flex-col w-full">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <MotionDiv
                  key={post.id}
                  className="py-4"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.75,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <PostCard post={post} />
                </MotionDiv>
              ))
            ) : (
              <p>Oops, looks like there are no posts yet...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

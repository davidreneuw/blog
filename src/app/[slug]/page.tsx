import { GetPost } from "@/lib/actions";
import { Post } from "@/types/global";
import { Suspense } from "react";
import Markdown from "react-markdown";

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense>
      <PostComponent slug={params.slug} />
    </Suspense>
  );
}

async function PostComponent(props: { slug: string }) {
  try {
    const post: Post | null = await GetPost(props.slug);
    let postRender =
      post === null ? (
        <div>Post not found</div>
      ) : (
        <div>
          {post.backgroundImage !== null ? (
            <div
              className={`h-48 w-full backdrop-filter backdrop-blur-sm bg-opacity-10`}
              style={{ backgroundImage: `${post.backgroundImage}` }}
            ></div>
          ) : null}
          <div className="flex flex-row w-full justify-center">
            <div className="flex flex-col w-11/12 md:w-1/2">
              <div className="my-8">
                <h1 className="text-5xl">{post.title}</h1>
                <h2 className="text-2xl italic">by {post.author}</h2>
              </div>
              <Markdown>{post.content}</Markdown>
            </div>
          </div>
        </div>
      );
    return postRender;
  } catch (error) {
    console.error(error);
  }
}

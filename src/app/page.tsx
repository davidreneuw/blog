import { HomePage } from "@/components/home/home-page";
import { POST_URL } from "@/lib/constants";
import { Post } from "@/types/global";

export default async function Home() {
  let response = await fetch(POST_URL, {
    cache: "no-cache",
  });

  if (response.ok) {
    let result = await response.json();
    let posts: Post[] = result.result;
    return <HomePage posts={posts} />;
  } else {
    console.error("Failed to fetch posts");
    return <div>Failed to fetch posts</div>;
  }
}

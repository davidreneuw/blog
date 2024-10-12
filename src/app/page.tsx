import { HomePage } from "@/components/home-page";
import { GetPosts } from "@/lib/actions";
import { Post } from "@/types/global";

export default async function Home() {
  let posts: Post[] = await GetPosts();
  return (
    <main className="flex min-h-screen flex-col px-24">
      <HomePage />
    </main>
  );
}

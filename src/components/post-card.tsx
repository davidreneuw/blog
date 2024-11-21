import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/types/global";
import removeMarkdown from "markdown-to-text";
import Image from "next/image";
import Link from "next/link";

export function PostCard({
  post,
  small = false,
}: {
  post: Post;
  small?: boolean;
}) {
  let imgSize = small ? "w-full" : "w-1/4";
  let imgRatio = small ? "aspect-[2/1]" : "aspect-[4/3]";
  let imgDisplay = small ? "flex-col" : "flex-row";
  let textRatio = small ? "w-full" : "w-4/5";
  let textLength = post.content.length;
  let excerpt =
    textLength > 500
      ? removeMarkdown(post.content).slice(0, 500) + "..."
      : removeMarkdown(post.content);
  return (
    <Card
      className={`bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col md:${imgDisplay}`}
    >
      <div
        className={`relative md:${imgSize} w-full aspect-[2/1] md:${imgRatio}`}
      >
        <Image
          src={
            post.backgroundImage || "https://picsum.photos/600/400/?blur&random"
          }
          alt="The Illusion of Time"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className={`flex-grow md:${textRatio}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300">{excerpt}</p>
        </CardContent>
        <CardFooter className="align-bottom">
          <Link
            href={`/${post.slug}`}
            className=" text-blue-600 dark:text-blue-400 hover:underline"
            scroll={false}
          >
            Read more
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}

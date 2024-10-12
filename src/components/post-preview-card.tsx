/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/XfqpICuWRKf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/types/global";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import AuthorizedView from "./authorized-view";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function PostPreviewCard(props: { post: Post }) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-0">
        <img
          src="/placeholder-image.jpg"
          alt="Blog Post Cover Image"
          width={400}
          height={200}
          className="w-full h-[200px] object-cover rounded-t-md"
        />
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{props.post.title}</h2>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span>{props.post.author}</span>
              </div>
              <span>•</span>
              <span>
                {props.post.createdAt.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <p className="text-muted-foreground">{props.post.content}</p>
          <div className="flex flex-row">
            <Link
              href={`/${props.post.slug}`}
              className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none"
              prefetch={false}
            >
              Read More
            </Link>
            <AuthorizedView allowedRoles={["admin"]}>
              <div className="flex flex-row gap-2 ml-auto">
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href={`/${props.post.slug}/edit`}
                      className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 text-primary-foreground font-medium hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <MdEdit color="black" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Edit Post</TooltipContent>
                </Tooltip>
                <Link
                  href={`/${props.post.slug}/delete`}
                  className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 text-primary-foreground font-medium hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <MdDelete color="black" />
                </Link>
              </div>
            </AuthorizedView>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

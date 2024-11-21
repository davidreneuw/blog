import ShareButton from "@/components//blogpost/share-button";
import AuthorizedView from "@/components/authorized-view";
import DeleteButton from "@/components/blogpost/delete-button";
import { MotionDiv } from "@/components/framer/framerdiv";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { POST_URL } from "@/lib/constants";
import { Post } from "@/types/global";
import { Pen } from "lucide-react";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense>
      <PostComponent slug={params.slug} />
    </Suspense>
  );
}

async function PostComponent(props: { slug: string }) {
  let response = await fetch(POST_URL + `/${props.slug}`, {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  let queryResult = await response.json();
  let post: Post = queryResult.result[0];
  let postRender =
    post == null || undefined ? (
      <div>Post not found</div>
    ) : (
      <div>
        {post.backgroundImage && post.backgroundImage !== "" ? (
          <div className="w-full h-32 -z-50">
            <img
              src={post.backgroundImage}
              alt={""}
              className="w-full h-48 object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-12 -z-50"></div>
        )}
        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-row w-full justify-center z-50">
            <div className="flex flex-col w-11/12 md:w-2/3">
              <Card className="px-4 mb-12">
                <CardHeader>
                  <CardTitle>
                    <div className="mt-4 mb-2">
                      <h1 className="text-5xl">{post.title}</h1>
                      <h2 className="text-lg text-gray-500 italic">
                        by {post.author} on{" "}
                        {new Date(post.createdAt).toLocaleDateString("en-us", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </h2>
                    </div>
                    <div className="flex flex-row gap-2">
                      <ShareButton />
                      <AuthorizedView allowedRoles={["admin"]}>
                        <a href={`/${post.slug}/edit`}>
                          <Button>
                            <Pen className="mr-2" size={16} />
                            Edit
                          </Button>
                        </a>
                        <DeleteButton id={post.id} />
                      </AuthorizedView>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-16">
                  <ReactMarkdown className="space-y-8">
                    {post.content}
                  </ReactMarkdown>
                </CardContent>
                <CardFooter>
                  <div className="text-gray-500 text-sm">
                    <p>
                      Last updated:{" "}
                      {new Date(post.updatedAt).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </MotionDiv>
      </div>
    );
  return postRender;
}

import AuthorizedView from "@/components/authorized-view";
import BlogForm from "@/components/blogpost/edit-post-form";
import { POST_URL } from "@/lib/constants";
import { Post } from "@/types/global";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function EditPage({
  params,
}: {
  params: { slug: string };
}) {
  let { userId } = await auth();
  let user = await currentUser();
  let post: Post = await fetch(POST_URL + `?slug=${params.slug}`, {
    cache: "no-cache",
  })
    .then((res) => res.json())
    .then((res) => res.result[0]);

  return post ? (
    <AuthorizedView allowedRoles={["admin"]}>
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-11/12 md:w-1/2 py-8">
          <BlogForm initialData={post} userName={user?.fullName!} />
        </div>
      </div>
    </AuthorizedView>
  ) : (
    <>Post not found</>
  );
}

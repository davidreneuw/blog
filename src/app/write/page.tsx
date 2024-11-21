import AuthorizedView from "@/components/authorized-view";
import BlogForm from "@/components/blogpost/edit-post-form";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function NewPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let { userId } = await auth();
  let user = await currentUser();

  return (
    <AuthorizedView allowedRoles={["admin"]}>
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-11/12 md:w-1/2 py-8">
          <BlogForm initialData={null} userName={user?.fullName!} />
        </div>
      </div>
    </AuthorizedView>
  );
}

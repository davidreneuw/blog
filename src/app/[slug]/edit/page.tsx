import AuthorizedView from "@/components/authorized-view";
import EditForm from "@/components/edit-post-form";
import { GetPost, GetTags } from "@/lib/actions";
import { Post } from "@/types/global";

const markdown = `
Hello **world**!
`;

export default async function EditPage({
  params,
}: {
  params: { slug: string };
}) {
  let post: Post | null = await GetPost(params.slug);
  let existingTags: string[] = await GetTags();

  return post ? (
    <AuthorizedView allowedRoles={["admin"]}>
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-11/12 md:w-1/2 py-8">
          <h1 className="text-3xl font-bold mb-4">Edit post {post.title}</h1>
          <EditForm params={{ post, existingTags }} />
        </div>
      </div>
    </AuthorizedView>
  ) : (
    <>Post not found</>
  );
}

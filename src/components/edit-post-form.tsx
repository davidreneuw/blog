"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdatePostFormAction } from "@/lib/actions";
import { stringToTags, tagsToString } from "@/lib/utils";
import { Post } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./file-upload";
import { TagsInput } from "./tags-input";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";

const EditorComp = dynamic(() => import("@/components/editor"), { ssr: false });

const formSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string().min(10),
  tags: z.array(z.string().min(2).max(50)),
  backgroundImage: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: "File size must be less than 4MB",
      })
    )
    .max(1, {
      message: "Maximum 1 file is allowed",
    })
    .nullable(),
});

export default function EditForm({
  params,
}: {
  params: { post: Post; existingTags?: string[] };
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const saveChanges = UpdatePostFormAction.bind(null, params.post.id);

  const [markdownContent, setMarkdownContent] = useState(params.post.content);
  const [tags, setTags] = useState(stringToTags(params.post.tags));
  const [tagsString, setTagsString] = useState(tagsToString(tags));

  useEffect(() => {
    setTagsString(tagsToString(tags));
  }, [tags]);

  const dropzone = {
    multiple: true,
    maxFiles: 3,
    maxSize: 4 * 1024 * 1024,
  } satisfies DropzoneOptions;

  return (
    <Form {...form}>
      <form action={saveChanges}>
        <div className="mb-6">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-xl">Title</span>
                </FormLabel>
                <FormDescription>Enter a title for your post</FormDescription>
                <FormControl>
                  <Input {...field} defaultValue={params.post.title} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-6">
          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-xl">Tags</span>
                </FormLabel>
                <FormControl>
                  <Input type="hidden" {...field} value={tagsString} />
                </FormControl>
                <FormDescription>Enter tags</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <TagsInput
            params={{
              startTags: tags,
              onChange: setTags,
              suggestions: params.existingTags,
            }}
          />
        </div>
        <div className="mb-6">
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-xl">Content</span>
                </FormLabel>
                <FormControl>
                  <Input type="hidden" {...field} value={markdownContent} />
                </FormControl>
                <FormDescription>Enter content</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Suspense fallback={<MarkdownEditorSkeleton />}>
            <div className="h-[500px] overflow-scroll">
              <EditorComp
                markdown={markdownContent}
                onChange={(e) => {
                  setMarkdownContent(e);
                }}
              />
            </div>
          </Suspense>
        </div>
        <div>
          <FormField
            name="backgroundImage"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-xl">Background Image</span>
                </FormLabel>
                <FormDescription>Upload a background image</FormDescription>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    dropzoneOptions={dropzone}
                    reSelect={true}
                  >
                    <FileInput>
                      <Button type="button">
                        <Paperclip size={20} />
                        <span>Upload</span>
                      </Button>
                    </FileInput>
                    {field.value && field.value.length > 0 && (
                      <FileUploaderContent className="w-full -ml-3 rounded-b-none rounded-t-md flex-row gap-2 ">
                        {field.value.map((file, i) => {
                          let url = URL.createObjectURL(file);
                          return (
                            <FileUploaderItem
                              key={i}
                              index={i}
                              aria-roledescription={`file ${i + 1} containing ${
                                file.name
                              }`}
                              className="p-0 size-20"
                            >
                              <AspectRatio className="size-full">
                                <Image
                                  src={url}
                                  alt={file.name}
                                  className="object-cover rounded-md"
                                  fill
                                />
                              </AspectRatio>
                              <Input type="hidden" {...field} value={url} />
                            </FileUploaderItem>
                          );
                        })}
                      </FileUploaderContent>
                    )}
                  </FileUploader>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export function MarkdownEditorSkeleton() {
  return <Skeleton className="h-[500px]" />;
}

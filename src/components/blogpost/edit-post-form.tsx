"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { POST_URL, SLUG_URL, UPLOAD_URL } from "@/lib/constants";
import { Post, PostInsert, PostUpdate } from "@/types/global";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { PutBlobResult } from "@vercel/blob";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { MotionDiv } from "../framer/framerdiv";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function BlogForm({
  initialData,
  userName,
}: {
  initialData: Post | null;
  userName: string;
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    initialData ? updatePost() : createPost();
  };

  const updatePost = async () => {
    const updatedPost: PostUpdate = {
      ...initialData!,
      title,
      content,
      author: userName,
    };
    if (backgroundImage) {
      console.log("Uploading new background image");

      const formData = new FormData();
      formData.append("file", backgroundImage as File);
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Background image uploaded");
        const data: PutBlobResult = await response.json();
        updatedPost.backgroundImage = data.url;
      } else {
        console.error("Failed to upload background image");
        toast.error("Failed to upload background image.");
        return;
      }
    }

    console.log("Updating post");

    const updateResponse = await fetch(POST_URL, {
      method: "PUT",
      body: JSON.stringify(updatedPost),
    });
    if (updateResponse.ok) {
      console.log("Post updated");
      toast.success("Post updated successfully.");
      router.push(`/${initialData!.slug}`);
    } else {
      console.error("Failed to update post");
      toast.error("Failed to update post.");
    }
  };

  const createPost = async () => {
    let backgroundUrl = "";
    let postSlug = "";

    if (backgroundImage) {
      console.log("Uploading new background image");

      const formData = new FormData();
      formData.append("file", backgroundImage as File);
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Background image uploaded");
        const data: PutBlobResult = await response.json();
        backgroundUrl = data.url;
      } else {
        console.error("Failed to upload background image");
        toast.error("Failed to upload background image.");
        return;
      }
    }

    console.log("Obtaining slug");
    const response = await fetch(SLUG_URL, {
      method: "POST",
      body: JSON.stringify(title),
      cache: "no-cache",
    });

    if (response.ok) {
      console.log("Slug obtained");
      let slugJson = await response.json();
      postSlug = slugJson.slug;
    } else {
      console.error("Failed to obtain slug");
      return;
    }

    const newPost: PostInsert = {
      title,
      content,
      author: userName,
      slug: postSlug,
      backgroundImage: backgroundUrl,
      tags: "",
    };
    console.log("Creating post");
    const createResponse = await fetch(POST_URL, {
      method: "POST",
      body: JSON.stringify(newPost),
    });
    if (createResponse.ok) {
      console.log("Post created");
      toast.success("Post created successfully.");
      router.push(`/${postSlug}`);
    } else {
      console.error("Failed to create post");
      toast.error("Failed to create");
    }
  };

  const handlePaste = useCallback(async (event: React.ClipboardEvent) => {
    const items = event.clipboardData.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          event.preventDefault();
          const blob = items[i].getAsFile();
          if (blob) {
            console.log("Pasted image detected");

            const formData = new FormData();
            formData.append("file", blob);
            const response = await fetch(UPLOAD_URL, {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              console.log("Pasted image uploaded");
              const data: PutBlobResult = await response.json();
              const imageMarkdown = `![Pasted Image](${data.url})`;
              setContent((prevContent) => prevContent + "\n" + imageMarkdown);
              toast.success("The pasted image has been added to your content.");
            } else {
              console.error("Failed to upload pasted image");
              toast.error("Failed to upload pasted image.");
            }
          }
        }
      }
    }
  }, []);

  return (
    <MotionDiv
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      viewport={{ once: true }}
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>
            {initialData ? "Edit Blog Post" : "Create New Blog Post"}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog post title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="background-image">Background Image</Label>
              <Input
                id="background-image"
                type="file"
                onChange={(e) =>
                  setBackgroundImage(e.target.files?.[0] || null)
                }
                accept="image/*"
                className="cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="content">Content</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? "Edit" : "Preview"}
                </Button>
              </div>
              {previewMode ? (
                <div className="border rounded-md p-4 min-h-[300px] prose max-w-none">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              ) : (
                <MDEditor
                  value={content}
                  onChange={(value) => setContent(value || "")}
                  preview="edit"
                  height={300}
                  onPaste={handlePaste}
                />
              )}
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button type="submit" className="w-full">
              {initialData ? "Update Post" : "Create Post"}
            </Button>
            {initialData ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/${initialData.slug}`)}
              >
                Cancel
              </Button>
            ) : null}
          </CardFooter>
        </form>
      </Card>
    </MotionDiv>
  );
}

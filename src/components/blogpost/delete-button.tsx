"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { POST_URL } from "@/lib/constants";
import { PostDelete } from "@/types/global";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const onPostDelete = async () => {
    let delPost: PostDelete = { id: id };
    let deleteResponse = await fetch(POST_URL, {
      method: "DELETE",
      body: JSON.stringify(delPost),
    });
    if (deleteResponse.ok) {
      toast.success("Post deleted");
      router.push("/");
    } else {
      throw new Error("Failed to delete post");
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant={"destructive"} onClick={() => setOpen(true)}>
          <Trash2 className="mr-2" size={16} />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"destructive"} onClick={onPostDelete}>
            Delete
          </Button>
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

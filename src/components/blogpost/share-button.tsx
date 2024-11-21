"use client";

import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { toast } from "sonner";

export default function ShareButton() {
  const copytoClipboard = async () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard");
  };
  return (
    <Button variant={"outline"} onClick={() => copytoClipboard()}>
      <Link className="mr-2" size={16} /> Share
    </Button>
  );
}

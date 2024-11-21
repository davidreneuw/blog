import Image from "next/image";
import { Card, CardContent } from "../ui/card";

import { Button } from "@/components/ui/button";

export function AuthorCard() {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
        <Image
          src={"/carlos.jpg"}
          alt="Picture of Carlos Delos Santos"
          width={300}
          height={300}
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Carlos Delos Santos</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Welcome to my corner of the internet! Im a philosopher, writer, and
            eternal student of life. This blog is where I share my thoughts on
            mindfulness, the nature of time, and the beauty of slow living.
          </p>
          <a href="/about">
            <Button variant="outline">More About Me</Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

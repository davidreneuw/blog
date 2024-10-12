import { ArrowRightIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function HomePage() {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Time flows as ripples on a pond
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Exploring the ebb and flow of life, one thought at a time.
        </p>
        <section className="mb-16">
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="Author"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Jane Doe</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Welcome to my corner of the internet! I'm a philosopher,
                  writer, and eternal student of life. This blog is where I
                  share my thoughts on mindfulness, the nature of time, and the
                  beauty of slow living.
                </p>
                <Button variant="outline">More About Me</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Featured Post
          </h2>
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/5 aspect-[3/4] md:aspect-auto">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="The Illusion of Time"
                layout="fill"
                objectFit="cover"
              />
              <Badge className="absolute top-2 right-2 bg-white/80 text-gray-800 dark:bg-gray-800/80 dark:text-gray-100">
                <HeartIcon className="w-4 h-4 mr-1 inline-block" />
                1.2k
              </Badge>
            </div>
            <div className="flex-grow md:w-4/5">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  The Illusion of Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  In this post, we delve into the philosophical concept of time
                  and how our perception shapes our reality. We explore the
                  nature of time as a construct and its impact on our daily
                  lives.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost">
                  Read more <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Recent Posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Mindfulness in the Digital Age",
                excerpt:
                  "Exploring ways to stay present in a world of constant distraction.",
                image: "/placeholder.svg?height=300&width=600",
                likes: 856,
              },
              {
                title: "The Art of Slow Living",
                excerpt:
                  "Embracing a slower pace in a fast-paced world and its benefits.",
                image: "/placeholder.svg?height=300&width=600",
                likes: 1103,
              },
              {
                title: "Reflections on Nature",
                excerpt:
                  "How connecting with nature can ground us and provide perspective.",
                image: "/placeholder.svg?height=300&width=600",
                likes: 723,
              },
            ].map((post, index) => (
              <Card className="h-full bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="relative w-full aspect-[2/1]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-white/80 text-gray-800 dark:bg-gray-800/80 dark:text-gray-100">
                    <HeartIcon className="w-4 h-4 mr-1 inline-block" />
                    {post.likes}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read more
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

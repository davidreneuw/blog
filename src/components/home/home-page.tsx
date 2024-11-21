"use client";

import { motion } from "framer-motion";

import { Post } from "@/types/global";
import { PostCard } from "../post-card";
import { AuthorCard } from "./author-card";

export function HomePage({ posts }: { posts: Post[] }) {
  let featuredPost = posts[0];
  let recentPosts = posts.slice(1);

  return (
    <div className="mx-12 sm:mx-24 md:mx-32 lg:mx-48 pb-16">
      <h1 className="pt-16 text-4xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Time flows as ripples on a still pond...
      </h1>
      <p className="pb-16 text-xl text-gray-600 dark:text-gray-300 max-w-2xl italic">
        Exploring the ebb and flow of life, one thought at a time.
      </p>
      <section className="mb-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          viewport={{ once: true }}
        >
          <AuthorCard />
        </motion.div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Featured Post
        </h2>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <PostCard post={featuredPost} />
        </motion.div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Recent Posts
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post, index) => (
            <motion.div
              className="flex items-stretch"
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                ease: "easeInOut",
                duration: 0.75,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <PostCard post={post} small />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

import pages from "@hono/vite-cloudflare-pages";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import client from "honox/vite/client";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import ssg from "@hono/vite-ssg";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [client()],
    };
  } else {
    return {
      plugins: [
        ssg(),
        honox(),
        pages(),
        mdx({
          jsxImportSource: "hono/jsx",
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
          rehypePlugins: [rehypeHighlight],
        }),
      ],
      build: {
        assetsDir: "static",
        ssrEmitAssets: true,
      },
    };
  }
});

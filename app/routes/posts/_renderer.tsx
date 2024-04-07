import { jsxRenderer } from "hono/jsx-renderer";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
  const _title = `${frontmatter?.title} | Blog Name`;

  return (
    <Layout title={_title} description={frontmatter?.description}>
      <div class="markdown">{children}</div>
    </Layout>
  );
});

import { css } from "hono/css";
import { createRoute } from "honox/factory";
import MainNav from "../islands/main-nav";
import Header from "../islands/header";
import Footer from "../islands/footer";
import { FC } from "hono/jsx";
import { SideBar } from "../islands/sidebar";

const className = css`
  font-family: sans-serif;

  #inner-container {
    display: grid;
    grid-template-columns: 680px 6px 320px;
    gap: 10px;
    margin: 0 auto;
  }

  .main {
    background-color: lightblue;
    padding: 20px;
  }

  .border {
    border-left: 1px solid black;
  }

  .sidebar {
    padding: 20px;
  }

  /* スマートフォン向けのスタイル */
  @media screen and (max-width: 767px) {
    #inner-container {
      grid-template-columns: 1fr; /* 1列にスタック */
    }

    .border {
      display: none; /* ボーダーを非表示に */
    }

    .main,
    .sidebar {
      width: auto; /* 横幅いっぱいに広げる */
    }
  }
`;

export default createRoute((c) => {
  return c.render(
    <div class={className}>
      <MainNav />
      <Header />
      <div class="container">
        <div id="inner-container">
          <div class="main">メインコンテンツ</div>
          <div class="border"></div>
          <div class="sidebar">
            <SideBar />
          </div>
        </div>
      </div>
      <Footer />
    </div>,
    { title: "ぎーじゅく@渋谷、新宿を拠点としたギークハウス" }
  );
});

const Posts: FC = () => {
  const posts = import.meta.glob<{
    frontmatter: { title: string; date: string; published: boolean };
  }>("./posts/*.mdx", { eager: true });
  const entries = Object.entries(posts).filter(
    ([_, module]) => module.frontmatter.published
  );

  return (
    <div class="mt-16">
      <ul class="mt-10">
        {entries.map(([id, module]) => (
          <li class="text-lg mt-2 md:mt-1">
            <span class="tabular-nums tnum">{module.frontmatter.date}: </span>
            <br class="block md:hidden" />
            <a
              class="text-blue-600 underline"
              href={`${id.replace(/\.mdx$/, "")}`}
            >
              {module.frontmatter.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

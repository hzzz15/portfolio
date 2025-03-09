import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

/**
 * @description SEO를 위해 본인의 정보로 수정해주세요.
 */
const DEFAULT_SEO = {
  title: "강희지 | ML Engineer",
  description: "안녕하세요, 머신러닝 개발자를 꿈꾸는 강희지 입니다",
  canonical: "https://www.naver.com/",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.naver.com/", 
    title: "강희지 | ML Engineer",
    site_name: "강희지 | ML Engineer",
    images: [
      {
        url: "/share.png",
        width: 285,
        height: 167,
        alt: "강희지 | ML Engineer",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  additionalMetaTags: [
    {
      name: "application-name",
      content: "강희지 | ML Engineer",
    },
    {
      name: "msapplication-tooltip",
      content: "강희지 | ML Engineer",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;

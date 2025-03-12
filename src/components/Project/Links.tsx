import GithubIcon from "@/assets/images/github.svg";
import WebIcon from "@/assets/images/web.svg";

interface LinksProps {
  repoUrl: string;
  webUrl?: string;
  notionUrl?: string;
}

const Links = ({ repoUrl, webUrl, notionUrl }: LinksProps) => {
  return (
    <div className="flex gap-1">
      {notionUrl && (
        <a
          target="_blank"
          rel="noreferrer"
          href={notionUrl}
          onClick={() => window.open(notionUrl, "_blank")}
          className="w-fit px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-[#B2CCFF] dark:hover:bg-[#B2CCFF] text-xs font-medium"
          >
          상세보기
        </a>
      )}
      {webUrl && (
        <a target="_blank" rel="noreferrer" href={webUrl} className="w-fit">
          <WebIcon className="hover:text-PRIMARY_HEAVY dark:hover:text-GRAY_HEAVY md:fill-current fill-BLACK dark:fill-white" />
        </a>
      )}
      <a target="_blank" rel="noreferrer" href={repoUrl} className="w-fit">
        <GithubIcon className="hover:text-PRIMARY_HEAVY dark:hover:text-GRAY_HEAVY md:fill-current fill-BLACK dark:fill-white" />
      </a>
    </div>
  );
};

export default Links;

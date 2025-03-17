import React, { useState } from "react";
import GithubIcon from "@/assets/images/github.svg";
import WebIcon from "@/assets/images/web.svg";
import NotionPopup from "./NotionPopup";

interface LinksProps {
  repoUrl: string;
  webUrl?: string;
  notionUrl?: string;
}

const Links = ({ repoUrl, webUrl, notionUrl }: LinksProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const notionId = notionUrl?.split("/").pop(); // 노션 ID 추출

  return (
    <div className="flex gap-1">
      {notionUrl && (
        <button
          onClick={() => setShowPopup(true)}
          className="w-fit px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-[#B2CCFF] dark:hover:bg-[#B2CCFF] text-xs font-medium"
        >
          상세보기
        </button>
      )}
      {webUrl && (
        <a target="_blank" rel="noopener noreferrer" href={webUrl} className="w-fit">
          <WebIcon className="hover:text-PRIMARY_HEAVY dark:hover:text-GRAY_HEAVY md:fill-current fill-BLACK dark:fill-white" />
        </a>
      )}
      {repoUrl && (
        <a target="_blank" rel="noopener noreferrer" href={repoUrl} className="w-fit">
          <GithubIcon className="hover:text-PRIMARY_HEAVY dark:hover:text-GRAY_HEAVY md:fill-current fill-BLACK dark:fill-white" />
        </a>
      )}

      {showPopup && notionId && <NotionPopup notionId={notionId} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Links;

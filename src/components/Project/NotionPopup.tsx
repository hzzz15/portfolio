import React, { useState, useEffect } from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { Collection, CollectionRow } from "react-notion-x/build/third-party/collection";
import LoadingPage from "./LoadingPage"; // 로딩 컴포넌트 임포트

interface NotionPopupProps {
  notionId: string;
  onClose: () => void;
}

const NotionPopup = ({ notionId, onClose }: NotionPopupProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`https://notion-api.splitbee.io/v1/page/${notionId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Notion data");
        }
        return res.json();
      })
      .then((json) => {
        console.log("🔍 Notion API Response:", json);
        if (json && Object.keys(json).length > 0) {
          setData({
            block: json,
            collection: json.collection || {},
            collection_view: json.collection_view || {},
            notion_user: json.notion_user || {},
          });
        } else {
          throw new Error("Invalid Notion data");
        }
      })
      .catch((err) => {
        console.error("❌ Notion API Error:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [notionId]);

  // 팝업 열릴 때 body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      {/* 팝업 컨테이너의 최대 너비를 max-w-3xl로 줄임 */}
      <div
        className="bg-white rounded-lg shadow-lg max-w-4xl w-full h-[90vh] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 overflow-auto p-4">
          {loading && <LoadingPage />}
          {error && <p className="text-red-500">노션 데이터를 불러오는데 실패했습니다.</p>}
          {data && !loading && !error && (
            <div style={{ width: "100%" }}>
              {/* 내부 콘텐츠의 너비를 80%로 제한하여 가운데 정렬 */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    .notion-page-content,
                    .notion-root,
                    .notion-page,
                    .notion-collection,
                    .notion-collection-view {
                      max-width: 90% !important;
                      width: 90% !important;
                      margin: 0 auto;
                    }
                  `,
                }}
              />
              <NotionRenderer
                recordMap={data}
                fullPage={true}
                darkMode={false}
                disableHeader={true}
                components={{ Collection, CollectionRow }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotionPopup;

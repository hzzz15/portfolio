import React, { useState, useEffect, useCallback } from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { Collection, CollectionRow } from "react-notion-x/build/third-party/collection";
import LoadingPage from "./LoadingPage";

interface NotionPopupProps {
  notionId: string;
  onClose: () => void;
}

const NotionPopup = ({ notionId, onClose }: NotionPopupProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // API 호출 및 캐싱 (sessionStorage 사용)
  const fetchNotionData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      // 캐시에서 데이터 조회
      const cachedData = sessionStorage.getItem(`notionData-${notionId}`);
      if (cachedData) {
        setData(JSON.parse(cachedData));
      } else {
        const res = await fetch(`https://notion-api.splitbee.io/v1/page/${notionId}`);
        if (!res.ok) throw new Error("Failed to fetch Notion data");

        const json = await res.json();
        if (json && Object.keys(json).length > 0) {
          const fetchedData = {
            block: json,
            collection: json.collection || {},
            collection_view: json.collection_view || {},
            notion_user: json.notion_user || {},
          };
          setData(fetchedData);
          // 캐싱 (세션 캐시)
          sessionStorage.setItem(`notionData-${notionId}`, JSON.stringify(fetchedData));
        } else {
          throw new Error("Invalid Notion data");
        }
      }
    } catch (err) {
      console.error("❌ Notion API Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [notionId]);

  useEffect(() => {
    fetchNotionData();
  }, [fetchNotionData]);

  // 팝업 열릴 때 body 스크롤 막기 (원래 값 복원)
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 이벤트 전파 중지 처리
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-4xl w-full h-[90vh] relative flex flex-col"
        onClick={stopPropagation}
      >
        <div className="flex-1 overflow-auto p-4">
          {loading && <LoadingPage />}
          {error && <p className="text-red-500">노션 데이터를 불러오는데 실패했습니다.</p>}
          {data && !loading && !error && (
            <div style={{ width: "100%" }}>
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

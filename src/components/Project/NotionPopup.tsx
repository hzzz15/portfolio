import React, { useState, useEffect } from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { Collection, CollectionRow } from "react-notion-x/build/third-party/collection";

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
    // 팝업이 열리면 body 스크롤을 막는다
    document.body.style.overflow = "hidden";
    return () => {
      // 팝업이 닫히면 원래대로 복구
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full h-[90vh] relative flex flex-col">
        {/* 상단 헤더 영역 (닫기 버튼 고정) */}
        <div className="sticky top-0 bg-white z-50 p-4 flex justify-end">
          <button 
            className="text-xl font-bold bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            onClick={onClose}
          >
            닫기 ✕
          </button>
        </div>
        
        {/* 스크롤되는 콘텐츠 영역 */}
        <div className="flex-1 overflow-auto p-4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">노션 데이터를 불러오는데 실패했습니다.</p>}
          {data && !loading && !error && (
            <NotionRenderer
              recordMap={data}
              fullPage={false} // or true
              darkMode={false}
              components={{ Collection, CollectionRow }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotionPopup;

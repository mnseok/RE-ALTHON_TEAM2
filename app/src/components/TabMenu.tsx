import React from "react";
import { useRouter } from "next/navigation";
import { GoPlus } from "react-icons/go";

interface TabMenuProps {
  tabs: string[]; // 부모 컴포넌트로부터 전달된 탭 리스트
  activeTab: string; // 현재 활성화된 탭
  setActiveTab: (tab: string) => void; // 탭 활성화 함수
}

const TabMenu: React.FC<TabMenuProps> = ({ tabs, activeTab, setActiveTab }) => {
  const router = useRouter(); // Next.js 라우팅

  const handleAddClick = () => {
    router.push("/topics"); // "추가" 버튼 클릭 시 /topics 페이지로 이동
  };

  return (
    <div className="flex items-end justify-start space-x-6 border-b border-gray-200 px-4 h-14">
      {/* 추가 버튼 */}
      <button
        onClick={handleAddClick}
        className="flex items-center text-sm font-medium text-black no-underline h-full"
      >
        <GoPlus className="w-4 h-4" />
      </button>

      {/* 탭 버튼들 */}
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`text-base font-medium pb-3 no-underline ${
            activeTab === tab
              ? "border-b-2 border-black text-black"
              : "border-b-2 border-transparent text-gray-500 hover:border-gray-400"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;

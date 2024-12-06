"use client";

import React, { useEffect, useState } from "react";
import { fetchAllTopics } from "@/lib/api"; // fetchAllTopics 함수는 서버에서 데이터를 가져옴
import { useRouter } from "next/navigation";

export interface Topic {
  id: number;
  positive: string;
  negative: string;
  title: string;
}

export default function Home() {
  const [topics, setTopics] = useState<Topic[]>([]); // 모든 토픽
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]); // 선택된 토픽
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Next.js 라우팅

  useEffect(() => {
    const loadTopics = async () => {
      try {
        // console.log("Fetching topics...");
        // const result = await fetchAllTopics();
        // console.log("Fetched topics:", result);
        // if (result.success) {
        //   setTopics();
        // } else {
        //   console.error("Failed to fetch topics:", result.msg);
        // }
        setTopics([
          // "금융투자세",
          // "기본소득",
          // "의료민영화",
          // "의대 정원 확대",
          // "동덕여대",
          // "뉴진스",
          //           +,-
          // 금융투자세 도입 찬성,금융투자세 도입 반대
          // 기본소득 정책에 찬성,기본소득 정책에 반대
          // 의료민영화에 찬성,의료민영화에 반대
          // 의대 정원 확대에 찬성,의대 정원 확대에 반대
          // 학생측 잘못,학교측 잘못
          // 뉴진스측 책임,"하이브, 어도어측 책임"

          {
            id: 1,
            positive: "금융투자세 도입 찬성",
            negative: "금융투자세 도입 반대",
            title: "금융투자세",
          },
          {
            id: 2,
            positive: "기본소득 정책에 찬성",
            negative: "기본소득 정책에 반대",
            title: "기본소득",
          },
          {
            id: 3,
            positive: "의료민영화에 찬성",
            negative: "의료민영화에 반대",
            title: "의료민영화",
          },
          {
            id: 4,
            positive: "의대 정원 확대에 찬성",
            negative: "의대 정원 확대에 반대",
            title: "의대 정원 확대",
          },
          {
            id: 5,
            positive: "학생측 잘못",
            negative: "학교측 잘못",
            title: "동덕여대",
          },
          {
            id: 6,
            positive: "뉴진스측 책임",
            negative: "하이브, 어도어측 책임",
            title: "뉴진스",
          },
        ]);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, []);

  const handleSelectTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      // 이미 선택된 경우 제거
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      // 선택되지 않은 경우 추가
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleAddTopics = async () => {
    // navigate to main page
    router.push("/");
  };

  if (loading) {
    return <p>Loading topics...</p>;
  }

  return (
    <main className="h-full flex flex-col items-center justify-center gap-32 pt-48">
      <div className="flex flex-wrap gap-4 justify-center max-w-2xl p-4">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium ${
              selectedTopics.includes(topic.title)
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleSelectTopic(topic.title)}
          >
            {topic.title}
          </button>
        ))}
      </div>
      <button
        className="mt-6 py-2 px-6 bg-black text-white rounded shadow hover:bg-black"
        onClick={handleAddTopics}
        disabled={selectedTopics.length === 0}
      >
        Add Selected Topics
      </button>
    </main>
  );
}

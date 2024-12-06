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
        console.log("Fetching topics...");
        const result = await fetchAllTopics();
        console.log("Fetched topics:", result);
        if (result.success) {
          setTopics(result.data);
        } else {
          console.error("Failed to fetch topics:", result.msg);
        }
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
              selectedTopics.includes(topic.id)
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleSelectTopic(topic.id)}
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

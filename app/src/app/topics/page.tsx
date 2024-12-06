"use client";

import React, { useEffect, useState } from "react";
import { fetchAllTopics } from "@/lib/api"; // fetchAllTopics 함수는 서버에서 데이터를 가져옴
import { addTopics } from "@/lib/api"; // 선택된 토픽을 추가하는 함수

export default function Home() {
  const [topics, setTopics] = useState<string[]>([]); // 모든 토픽
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]); // 선택된 토픽
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const result = await fetchAllTopics();
        if (result.success) {
          setTopics(result.topics);
        } else {
          console.error("Failed to fetch topics:", result.message);
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
    try {
      const result = await addTopics(selectedTopics);
      if (result.success) {
        alert(result.message); // 성공 메시지
      } else {
        alert(result.message); // 실패 메시지
      }
    } catch (error) {
      console.error("Error adding topics:", error);
    }
  };

  if (loading) {
    return <p>Loading topics...</p>;
  }

  return (
    <main className="h-full flex flex-col items-center justify-center gap-32 pt-48">
      <div className="flex flex-wrap gap-4 justify-center max-w-2xl p-4">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium ${
              selectedTopics.includes(topic)
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleSelectTopic(topic)}
          >
            {topic}
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

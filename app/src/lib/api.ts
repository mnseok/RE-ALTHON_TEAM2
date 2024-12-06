// lib/api.ts

import { Topic } from "@/app/topics/page";
import { NewsCardDto } from "@/types/dto/NewsCardDto";

interface ApiResponse<T> {
  status: string; // 상태 (예: "success", "error")
  data: T; // 응답 데이터 (제네릭 타입)
  msg?: string; // 오류 메시지
}

const baseUrl = "http://0.0.0.0:8000";

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMzUxOTQ0NSwianRpIjoiOTE3ZTI5ZTMtNmRmZi00ZWYzLWJlYTEtZWQ1YmNhZWZkZmI0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MSwiZW1haWwiOiJtb2NrQG5hdmVyLmNvbSJ9LCJuYmYiOjE3MzM1MTk0NDUsImNzcmYiOiI0NTQzNmZhMS0zNTNjLTQ0MGEtODEzOS01MjczYmJhMzc3MmEiLCJleHAiOjE3MzM1MjAzNDV9.bYDsjE2y54DfWBuXZt6aD2yzP4urvnztnv1aMYedqIs",
};

export const login = async (): Promise<{ success: boolean; msg: string }> => {
  try {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "admin", password: "admin" }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data: ApiResponse<null> = await response.json();

    if (data.status !== "success") {
      throw new Error(data.msg || "Failed to login");
    }

    return {
      success: true,
      msg: data.msg || "Login successful",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error logging in:", errorMessage);

    return { success: false, msg: errorMessage };
  }
};

// 함수 구현
export const fetchTabs = async (): Promise<string[]> => {
  try {
    console.log("Fetching tabs...");
    const response = await fetch(`${baseUrl}/api/news/topics`, {
      method: "GET",
      headers,
    });
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("Failed to fetch tabs");
    }

    console.log("Response:", response);
    const data: ApiResponse<string[]> = await response.json();

    // 응답 상태가 성공인지 확인
    if (data.status !== "success") {
      throw new Error("Unexpected response status");
    }

    return data.data; // 서버에서 받아온 탭 목록 반환
  } catch (error) {
    console.error("Error fetching tabs:", error);
    throw error; // 오류를 호출자에게 전달
  }
};

export const addTopics = async (
  topicIds: number[]
): Promise<{ success: boolean; msg: string }> => {
  try {
    const response = await fetch(`${baseUrl}/api/news/topics`, {
      method: "POST",
      headers,
      body: JSON.stringify({ topicIds }),
    });

    if (!response.ok) {
      throw new Error("Failed to add topics");
    }

    const data: ApiResponse<null> = await response.json(); // 명시적 타입 사용

    // 응답 상태 확인
    if (data.status !== "success") {
      throw new Error(data.msg || "Failed to add topics");
    }

    return {
      success: true,
      msg: data.msg || "Topics added successfully",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error adding topics:", errorMessage);

    return { success: false, msg: errorMessage };
  }
};

export const fetchAllTopics = async (): Promise<{
  success: boolean;
  topics: Topic[];
  msg: string;
}> => {
  try {
    console.log("Fetching topics...");
    const response = await fetch(`${baseUrl}/api/news/topics/all`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data: ApiResponse<string[]> = await response.json(); // 명시적 타입 사용
    console.log("Fetched topics:", data);

    return {
      success: true,
      data: data,
      msg: data.msg || "Topics fetched successfully",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching topics:", errorMessage);

    return { success: false, topics: [], msg: errorMessage };
  }
};

export const fetchNews = async (topicId: number): Promise<NewsCardDto[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/news/${topicId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data: ApiResponse<NewsCardDto[]> = await response.json();

    if (data.status !== "success") {
      throw new Error(data.msg || "Failed to fetch news");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const fetchNewsById = async (id: string): Promise<NewsCardDto> => {
  try {
    const response = await fetch(`${baseUrl}/api/news/${id}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data: ApiResponse<NewsCardDto> = await response.json();

    if (data.status !== "success") {
      throw new Error(data.msg || "Failed to fetch news");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

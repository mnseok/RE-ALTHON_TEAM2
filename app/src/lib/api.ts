// lib/api.ts

interface ApiResponse<T> {
  status: string; // 상태 (예: "success", "error")
  data: T; // 응답 데이터 (제네릭 타입)
  message?: string; // 오류 메시지
}

// 함수 구현
export const fetchTabs = async (): Promise<string[]> => {
  try {
    // Flask 서버에서 응답 시 제공하는 형식
    const response = {
      ok: true,
      json: async (): Promise<ApiResponse<string[]>> => ({
        status: "success",
        data: ["최신", "인기", "추천"],
      }),
    };

    if (!response.ok) {
      throw new Error("Failed to fetch tabs");
    }

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
  topics: string[]
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch("/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topics }), // 여러 개의 토픽을 배열로 전송
    });

    if (!response.ok) {
      throw new Error("Failed to add topics");
    }

    const data: ApiResponse<null> = await response.json(); // 명시적 타입 사용

    // 응답 상태 확인
    if (data.status !== "success") {
      throw new Error(data.message || "Failed to add topics");
    }

    return {
      success: true,
      message: data.message || "Topics added successfully",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error adding topics:", errorMessage);

    return { success: false, message: errorMessage };
  }
};

export const fetchAllTopics = async (): Promise<{
  success: boolean;
  topics: string[];
  message: string;
}> => {
  try {
    // const response = await fetch("/api/topics", {
    //   method: "GET",
    // });

    // mock data
    const response = {
      ok: true,
      json: async (): Promise<ApiResponse<string[]>> => ({
        status: "success",
        data: [
          "Technology",
          "Sience",
          "Health",
          "Business",
          "Sports",
          "Technology",
          "Sience",
          "Health",
          "Business",
          "Sports",
          "Technology",
          "Sience",
          "Health",
          "Business",
          "Sports",
          "Technology",
          "Sience",
          "Health",
          "Business",
          "Sports",
          "Technology",
          "Sience",
          "Health",
          "Business",
          "Sports",
        ],
      }),
    };

    if (!response.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data: ApiResponse<string[]> = await response.json(); // 명시적 타입 사용

    // 응답 상태 확인
    if (data.status !== "success" || !data.data) {
      throw new Error(data.message || "Failed to fetch topics");
    }

    return {
      success: true,
      topics: data.data,
      message: data.message || "Topics fetched successfully",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching topics:", errorMessage);

    return { success: false, topics: [], message: errorMessage };
  }
};

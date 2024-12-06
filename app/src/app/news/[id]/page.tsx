import Image from "next/image";
import { FaComment, FaEye, FaMinus, FaThumbsUp } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

export default async function Home() {
  const news = {
    id: 1,
    title: "학생 고소한 학교…동덕여대 사태 악화에 교육계서 '소통론'",
    description:
      "동덕여대가 남녀공학 전환에 반대하며 본관을 점거한 학생들을 상대로 가처분 신청과 형사 고소에 나선 가운데, 총학생회가 본관 점거 해제를 조건으로 학교 측의 사과를 비롯한 5가지 요구사항을 밝히며 사태가 장기화될 조짐을 보이고 있다. 2일 서울 성북구 동덕여자대학교 100주년기념관 일대가 남녀공학 전환에 반대하는 학생들의 '래커 시위' 등으로 어수선한 분위기를 나타내고 있다.\n\n동덕여대는 학교 측이 사과할 경우 본관 점거를 풀겠다고 한 총학생회를 향해 '어처구니없는 상황'이라며 '지금이라도 불법행위 책임을 인정하고 빨리 점거를 해제하라'고 강력히 대응했다. \n\n동덕여대는 2일 교무처장인 이민주 비상대책위원장 명의로 입장문을 내고 '이번 사태의 위법성에 대해 일말의 반성과 책임감 없는 총학생회의 태도를 안타깝게 생각한다'며 이같이 밝혔다.\n\n이 위원장은 '이번 불법행위로 인한 피해는 상상할 수 없을 정도'라며 수십억에 이르는 재산적 손해와 정신적 피해를 거론했다. 또한 '대학의 이미지와 위상이 나락으로 떨어져 취업의 길은 막막하기만 하다'며 '무엇보다 가슴 아픈 일은 이번 사태로 인해 시위에 참석하지 않은 대부분의 학생들이 가혹한 사회적 편견과 불이익을 감당해야 한다는 것'이라고 안타까워했다.\n\n그러면서 '대학은 총학생회를 비롯한 주동 학생들에게 그 책임을 엄격히 묻겠다'며 '점거가 길어질수록 책임은 무거워진다'고 강조했다.\n\n이 위원장은 수업 거부로 비롯된 결석 처리를 해결해달라는 총학 요구에도 '협박과 종용에 의해 불가피하게 수업 거부에 동참한 학생이 있다는 점은 참작하겠다'고 답했다.\n\n이 학교 총학은 전날 남녀공학 전환 논의 사과, 남녀공학 전환에 대해 차기 총학생회와 논의, 수업 거부에 대한 출결 정상화 등의 조건을 받아들이면 본관 점거를 해제하겠다고 밝혔다.\n\n그에 앞서 대학 측은 총장 명의로 총학생회장을 비롯한 학생과 성명불상자 21명을 공동재물손괴·공동건조물침입 등의 혐의로 고소했다.",
    likes: 28,
    comments: 12,
    views: 12929,
    // change string to date
    // created_at: "241207",
    created_at: new Date("2024-12-07"),
    press_name: "노컷뉴스",
    thumbnail_url:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1v91Cj.img?w=710&h=473&m=6",
    original_url:
      "https://www.msn.com/ko-kr/news/national/%ED%95%99%EC%83%9D-%EA%B3%A0%EC%86%8C%ED%95%9C-%ED%95%99%EA%B5%90-%EB%8F%99%EB%8D%95%EC%97%AC%EB%8C%80-%EC%82%AC%ED%83%9C-%EC%95%85%ED%99%94%EC%97%90-%EA%B5%90%EC%9C%A1%EA%B3%84%EC%84%9C-%EC%86%8C%ED%86%B5%EB%A1%A0/ar-AA1v8L1P",
  };

  return (
    <div className="container mx-auto px-24 min-h-screen">
      <div className="flex flex-row h-full">
        <div className="flex-[7] pr-32 pt-12">
          <h1 className="text-3xl mb-4 text-black">{news.title}</h1>
          <p className="text-gray-500 mt-4">
            등록: {news.created_at.getFullYear()}.{news.created_at.getMonth()}.
            {news.created_at.getDate()} 13:02:35
          </p>
          <div className="flex flex-row items-center justify-start mt-4">
            {/* <div className="rounded-full bg-gray-200 px-6 py-6 mr-2"></div> */}
            <Image
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Ny83Nzc3Nzc3Nzc3Nzc2ODU3Nzc3NTc3Nzc3Nzc3NzUtMi03LDc1Ljg3NTU1Lf/AABEIABwAHAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAADBQYHBP/EACoQAAEDAwIEBQUAAAAAAAAAAAECAwQABRESIQYxQYEHExUioRQyQlGS/8QAGwEAAQUBAQAAAAAAAAAAAAAABQECAwQGAAf/xAApEQABAwIEBAcBAAAAAAAAAAABAAIDESEEEhOBBRQxUSJBYXGh0fAV/9oADAMBAAIRAxEAPwBWTis6vRl2vWS6tQPr3Le8mJpC/NIGNJ5H943qQxSBuYiyrjFwOk0g8ZuyE3ZbrIgKnswHlxEpUovAbYHM/BrhFIW5gLJXYqBsmm54zdkr1UxT0TK2xFXG5RYSASX3UtnHQE7nsMntTmMzuDe6inlEMbpD5Cq3eZDZlwHoLicMutFogdEkYo65oc0tKwUcro5BIOoNVJcYLHDnh4m3hwKdWyiGFAY1kj3nukKNVpjpQZdkWwI5viJlpapd9fNFjuqhK1iq+B7jbbXfROuzxabaaV5ZDal+84H4g9NVWMK5jJMz0P4nDNPBpwipJvcC2/rRPjxvATx56gH3PSlRBGUstq6ZUFacZ+445dTVnmW69a2oh/8ALl5DSp4618valenS6UeJXE8K/PQmbW8p2MwlS1qLakZWcAbKAOwB/qosXM2SgarPCMDJhWudKKE722/WUTqqmi67FDakSoKqVchKrkiHTwFE5xBX/9k="
              alt="profile"
              width={40}
              height={40}
              className="rounded-full mr-4"
            />
            <div className="flex flex-col">
              <p className="text-gray-500 ">{news.press_name}</p>
              <a
                href={news.original_url}
                className="text-green-500 text-sm"
                target="_blank"
              >
                원본 기사 보기
              </a>
            </div>
          </div>

          <div className="w-full border-b mt-4 border-gray-400" />

          <div className="flex flex-row items-center justify-start mt-4 space-x-4">
            <div className="flex flex-row space-x-1">
              <FaThumbsUp className="text-gray-600" />
              <p className="text-gray-600 text-sm">{news.likes}</p>
            </div>
            <div className="flex flex-row space-x-1">
              <FaComment className="text-gray-600" />
              <p className="text-gray-600 text-sm">{news.comments}</p>
            </div>
            <div className="flex flex-row space-x-1">
              <FaEye className="text-gray-600" />
              <p className="text-gray-600 text-sm">{news.views}</p>
            </div>
          </div>
          <div className="w-full border-b mt-4 border-gray-400" />

          <p className="text-gray-500 mb-8 mt-6">{news.description}</p>
          <Image
            src={news.thumbnail_url}
            alt={news.title}
            width={710}
            height={473}
            className="rounded"
          />
        </div>
        {/* Vertical Divider */}
        <div className="border-l border-gray-300 min-h-screen"></div>
        {/* Right Section: flex-1 */}
        <div className="flex-[3] p-4">
          <div className="flex flex-col pt-6 gap-2 pl-4">
            <h1 className="text-black text-3xl font-bold">Topic: 동덕여대</h1>
            <div className="text-black font-bold">
              "{formatString(news.title)}"은 해당 주제에 관해
            </div>
            <div className="flex flex-col items-center w-full mb-4">
              <div className="flex justify-between w-full max-w-md">
                <span className="text-gray-700 font-bold">+</span>
                <span className="text-gray-700 font-bold">-</span>
              </div>
              <div className="relative w-full max-w-md h-4 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full">
                <div className="absolute top-4 left-1/4 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-500"></div>
              </div>
            </div>
            <div className="text-black font-bold">
              "+2.25"의 편향도를 가지고 있어요!
            </div>
            <div className="text-black text-xs">
              ( + 일수록 "동덕여대 공학전황에 대한 학생들의 대처가
              과했다.”이라는 의견에 가깝고, -일수록 “동덕여대 공학전황에 대한
              학생들의 대처가 정당했다.”(이)라는 의견에 가까워요){" "}
            </div>
          </div>
          <div className="ml-4 bg-gray-400 h-6 w-12 mt-4 rounded-full flex items-center justify-center text-xs font-bold">
            AI요약
          </div>
          <div className="ml-4 mt-4 text-black text-sm">
            동덕여대가 남녀공학 전환 결정에 반대하는 학생들의 본관 점거 사태로
            학교 측과 총학생회 간 갈등이 격화되고 있다. 학교 측은 가처분 신청과
            형사 고소를 진행하며 강경 대응하는 반면, 총학생회는 본관 점거 해제를
            조건으로 학교 측의 사과, 남녀공학 전환 재논의(차기 총학생회와), 수업
            거부에 대한 출결 정상화 등 5가지 요구를 제시했다. 학교 측은 점거로
            인한 재산 및 정신적 피해, 대학 이미지 실추 등을 주장하며 학생들의
            책임을 엄중히 묻겠다고 밝혔다. 하지만 수업 거부에 대해서는 협박과
            종용에 의한 참여를 일부 참작하겠다는 입장을 보였다. 결국, 학교의
            강경 대응과 총학생회의 조건부 점거 해제로 사태 장기화가 우려되는
            상황이다.
          </div>
          <h1 className="text-black text-1xl font-bold mt-8 ml-4">
            다른 뉴스는 이런 시각을 가지고 있어요!
          </h1>
          <div className="mt-4 ml-4">
            <FaPlus className="text-gray-600" />
            <div className="flex flex-col items-center w-full mt-4">
              <div className="text-black text-sm">
                “사과하라” VS “억지 주장”...동덕여대-총학 ‘본관 점거’ 공방 여전
              </div>
              <div className="text-black text-sm mt-2">
                동덕여대 시위가 남긴 저항의 교훈, [굿모닝 퓨처] '대안을 가지고
                싸우는 저항'의 필요성에 대하여
              </div>
            </div>
            <FaMinus className="text-gray-600" />
            <div className="flex flex-col items-center w-full mt-4">
              <div className="text-black text-sm">
                [단독]"본관 다시 점거"…'사다리' 타던 동덕여대생 10명, 3층 높이
                고립
              </div>
              <div className="text-black text-sm mt-2">
                [단독]침묵 깬 동덕여대 교수들 “고소 취하하고 회복 방안 마련하라”
                학교 규탄
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatString(str: string) {
  if (str.length <= 20) {
    // 문자열 전체 길이가 20자 이하라면 그대로 반환
    return str;
  }
  const start = str.slice(0, 15); // 앞 15자
  const end = str.slice(-6); // 뒤 5자
  return `${start}...${end}`; // 결과 문자열 반환
}

import NewsCard from "@/components/NewsCard";
import { NewsCardDto } from "@/types/dto/NewsCardDto";

const news: NewsCardDto[] = [
  {
    title: "The Next.js Blog",
    description: "The official blog for Next.js",
    pressName: "Next.js",
    commentCount: 10,
    likeCount: 20,
    createdAt: new Date(),
    imageUrl:
      "data:image/jpeg;base64,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",
    link: "https://nextjs.org/blog",
  },
];
export default function Home() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 border border-black min-h-screen">
      {/* Flex container for left and right sections */}
      <div className="flex flex-row h-full">
        {/* Left Section: flex-2 */}
        <div className="flex-[2] p-4">
          <h2 className="text-xl font-bold mb-4">Left Section</h2>
          <div className="grid grid-rows-1 gap-4 md:grid-rows-2 lg:grid-rows-3">
            {news.map((news) => {
              const formattedDate = formatDate(news.createdAt.toString());
              return (
                <NewsCard
                  key={news.title}
                  {...news}
                  createdAtString={formattedDate}
                />
              );
            })}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="border-l border-gray-300 min-h-screen"></div>

        {/* Right Section: flex-1 */}
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-4">Right Section</h2>
          <p>This is the right section for additional content.</p>
        </div>
      </div>
    </div>
  );
}

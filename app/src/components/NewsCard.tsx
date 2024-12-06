import React from "react";
import Image from "next/image";

interface NewsCardProps {
  pressName: string;
  title: string;
  description: string;
  commentCount: number;
  likeCount: number;
  createdAtString: string;
  imageUrl: string;
  link: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  pressName,
  title,
  description,
  commentCount,
  likeCount,
  createdAtString,
  imageUrl,
  link,
}) => {
  return (
    <div className="flex flex-row w-full border border-black overflow-hidden">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row w-full"
      >
        {/* 텍스트 콘텐츠 */}
        <div className="flex-1 p-4">
          <div className="flex flex-row items-center">
            <div className="bg-gray-300 w-6 h-6 rounded-full" />
            <p className="text-gray-600 text-xs ml-2">{pressName}</p>
          </div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm mt-2">{description}</p>
          <p className="text-gray-400 text-xs mt-4">
            {createdAtString} {commentCount} comments · {likeCount} likes
          </p>
        </div>

        {/* 이미지 */}
        <div className="relative h-48 w-48 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </a>
    </div>
  );
};

export default NewsCard;

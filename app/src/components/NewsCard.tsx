import React from "react";
import Image from "next/image";
import { FaThumbsUp } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";

interface NewsCardProps {
  id: number;
  press_name: string;
  title: string;
  description: string;
  comments: number;
  likes: number;
  views: number;
  createdAtString: string;
  original_url: string;
  thumbnail_url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  press_name,
  title,
  description,
  comments,
  likes,
  views,
  createdAtString,
  original_url,
  thumbnail_url,
}) => {
  return (
    <div className="flex flex-row w-full">
      <a
        href={`/news/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row w-full h-full overflow-hidden items-center p-10"
      >
        {/* 텍스트 콘텐츠 */}
        <div className="flex flex-1 flex-col justify-between p-4 h-full">
          {/* 신문사 명 */}
          <div className="flex flex-row items-center">
            <div className="bg-gray-300 w-6 h-6 rounded-full" />
            <p className="text-gray-600 text-xs ml-2">{press_name}</p>
          </div>

          {/* Title & Content */}
          <div className="flex-1 mt-4">
            <h3 className="text-3xl font-bold text-gray-800 line-clamp-1">
              {title}
            </h3>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex flex-row items-center justify-start mt-4 space-x-4">
            <p className="text-gray-600 text-sm">{createdAtString}</p>
            <div className="flex flex-row space-x-1">
              <FaThumbsUp className="text-gray-600" />
              <p className="text-gray-600 text-sm">{likes}</p>
            </div>
            <div className="flex flex-row space-x-1">
              <FaComment className="text-gray-600" />
              <p className="text-gray-600 text-sm">{comments}</p>
            </div>
          </div>
        </div>

        {/* 이미지 */}
        <div className="relative h-36 w-64 flex-shrink-0">
          <Image
            src={thumbnail_url}
            alt={title}
            fill
            className="object-center object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </a>
    </div>
  );
};

export default NewsCard;

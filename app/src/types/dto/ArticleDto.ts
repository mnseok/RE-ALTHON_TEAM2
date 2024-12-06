export interface NewsCardDto {
  id: number;
  press_name: string;
  title: string;
  description: string;
  comments: number;
  likes: number;
  views: number;
  createdAt: Date;
  thumbnail_url: string;
  original_url: string;
}

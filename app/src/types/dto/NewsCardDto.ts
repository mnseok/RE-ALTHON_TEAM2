export interface NewsCardDto {
  id: number;
  pressName: string;
  title: string;
  description: string;
  commentCount: number;
  likeCount: number;
  createdAt: Date;
  imageUrl: string;
  link: string;
}

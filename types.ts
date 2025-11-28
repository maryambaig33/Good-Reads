export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  ratingCount: number;
  genres: string[];
  description: string;
  pages: number;
  publishDate: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}

export interface AIAnalysisResult {
  themes: string[];
  mood: string;
  similarBooks: { title: string; reason: string }[];
  summary: string;
}
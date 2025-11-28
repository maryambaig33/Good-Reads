import { Book, Review } from './types';

export const CURRENT_BOOK: Book = {
  id: 'its-in-the-blood',
  title: "It's In The Blood",
  author: "Sarah A. Denzil",
  // Using a moody abstract placeholder that fits the thriller vibe since we can't scrape the real cover dynamically
  coverUrl: "https://picsum.photos/seed/blood3/400/600", 
  rating: 4.15,
  ratingCount: 12453,
  genres: ["Psychological Thriller", "Mystery", "Suspense", "Crime"],
  pages: 342,
  publishDate: "October 15, 2024",
  description: `Leah's mother has been in prison for twenty years. Now she’s coming home.
  
  When Leah was ten, she witnessed a crime that destroyed her family. Her testimony put her mother, Kat, behind bars for the murder of her father. Leah has spent two decades trying to forget the blood, the screams, and the look in her mother's eyes as she was led away.
  
  But now Kat is being released. She claims she's innocent, that she was framed, and she wants to reconnect with the daughter whose testimony condemned her.
  
  Leah has built a safe, quiet life for herself and her young son. She doesn't want to dig up the past. But as strange things start happening around her—objects moving, silent phone calls, a sensation of being watched—Leah begins to wonder: Is her mother really innocent? Or is she playing a deadly game of cat and mouse?
  
  Some secrets are buried deep. Others are in the blood.`
};

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    user: "Jessica Reads",
    avatar: "https://picsum.photos/seed/user1/100/100",
    rating: 5,
    date: "2 days ago",
    content: "Absolutely chilling! The atmosphere Denzil creates is suffocating in the best way possible. I couldn't trust anyone, not even the narrator.",
    likes: 142
  },
  {
    id: '2',
    user: "ThrillerSeeker88",
    avatar: "https://picsum.photos/seed/user2/100/100",
    rating: 4,
    date: "1 week ago",
    content: "Solid twist at the end. A bit slow in the middle, but the character development of Leah is top-notch. The mother-daughter dynamic is terrifying.",
    likes: 89
  },
  {
    id: '3',
    user: "BookishTom",
    avatar: "https://picsum.photos/seed/user3/100/100",
    rating: 5,
    date: "3 weeks ago",
    content: "I stayed up until 3 AM finishing this. 'It's In The Blood' asks the question: are we destined to become our parents? The answer here is terrifying.",
    likes: 256
  }
];
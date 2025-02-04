export interface BorrowedBookUser {
  id: number;
  title: string;
  author: string;
  genre: string;
}
export interface BorrowedBookAdmin {
  id: number;
  title: string;
  author: string;
  genre: string;
  borrowedBy: string;
}

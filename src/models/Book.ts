interface BookResponse {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
  borrowed: number;
}
export default BookResponse;

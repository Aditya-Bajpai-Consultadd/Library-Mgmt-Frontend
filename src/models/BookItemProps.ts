import Book from "./Book";
interface BookItemProps {
  book: Book;
  role: string | null;
  onAction: (id: number, action: "update" | "delete" | "borrow") => void;
}
export default BookItemProps;

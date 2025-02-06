import BookItemProps from "../models/BookItemProps";

const BookItem = ({ book, role, onAction }: BookItemProps) => {
  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-4 py-2 truncate">{book.title}</td>
      <td className="px-4 py-2 truncate">{book.author}</td>
      <td className="px-4 py-2 truncate">{book.genre}</td>
      <td className="px-4 py-2 truncate text-center">
        {book.available ? "Yes" : "No"}
      </td>
      <td className="px-4 py-2 flex justify-center space-x-2">
        {role === "Admin" ? (
          <>
            <button
              onClick={() => onAction(book.id, "update")}
              className="relative px-5 py-3 font-medium text-white transition duration-300 bg-green-400 rounded-md hover:bg-green-500 ease"
            >
              <span className="absolute bottom-0 left-0 h-full -ml-2">
                <svg
                  viewBox="0 0 487 487"
                  className="w-auto h-full opacity-100 object-stretch"
                >
                  <path
                    d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                    fill="#FFF"
                    fill-rule="nonzero"
                    fill-opacity=".1"
                  ></path>
                </svg>
              </span>
              <span className="absolute top-0 right-0 w-12 h-full -mr-3">
                <svg
                  viewBox="0 0 487 487"
                  className="object-cover w-full h-full"
                >
                  <path
                    d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                    fill="#FFF"
                    fill-rule="nonzero"
                    fill-opacity=".1"
                  ></path>
                </svg>
              </span>
              <span className="relative font-[Delius]">Update</span>
            </button>
            <button
              onClick={() => onAction(book.id, "delete")}
              className="relative inlin e-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-200 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-200 ease-in-out delay-50 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative font-[Delius] w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Delete
              </span>
            </button>
          </>
        ) : (
          <>
            {book.available && (
              <button
                onClick={() => onAction(book.id, "borrow")}
                className="relative  rounded px-5 py-2.5 overflow-hidden group bg-green-500  hover:bg-gradient-to-r hover:from-green-400 hover:to-bgreenlue-300 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-300 transition-all ease-out duration-200"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative font-[Delius]">Borrow</span>
              </button>
            )}
          </>
        )}
      </td>
    </tr>
  );
};

export default BookItem;

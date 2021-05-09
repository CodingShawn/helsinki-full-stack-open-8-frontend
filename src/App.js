import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import { useQuery } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const authorResults = useQuery(ALL_AUTHORS);
  const bookResults = useQuery(ALL_BOOKS);

  if (authorResults.loading || bookResults.loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors
        authors={authorResults.data.allAuthors}
        show={page === "authors"}
      />

      <Books books={bookResults.data.allBooks} show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;

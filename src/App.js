import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import { useApolloClient, useQuery } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const authorResults = useQuery(ALL_AUTHORS);
  const bookResults = useQuery(ALL_BOOKS);

  useEffect(() => setToken(localStorage.getItem("user-token")), []);

  function logout() {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  }

  if (authorResults.loading || bookResults.loading) {
    return <div>loading</div>;
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>Log in</button>
        </div>

        <Authors
          authors={authorResults.data.allAuthors}
          show={page === "authors"}
        />

        <Books books={bookResults.data.allBooks} show={page === "books"} />

        {page === "login" && <Login setToken={setToken} />}
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>Log out</button>
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

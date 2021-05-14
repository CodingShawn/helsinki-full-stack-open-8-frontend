import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, CURRENT_USER } from "./queries";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const authorResults = useQuery(ALL_AUTHORS);
  const bookResults = useQuery(ALL_BOOKS);
  const currentUser = useQuery(CURRENT_USER);

  useEffect(() => setToken(localStorage.getItem("user-token")), []);

  function updateCacheWith(addedBook) {
    function includedIn(set, object) {
      return set.map((book) => book.id).includes(object.id);
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} was added`);
      updateCacheWith(subscriptionData.data.bookAdded);
    },
  });

  function logout() {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  }

  if (authorResults.loading || bookResults.loading || currentUser.loading) {
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
          isLogin={false}
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
        <button onClick={() => setPage("recommended")}>Recommendations</button>
        <button onClick={logout}>Log out</button>
      </div>

      <Authors
        authors={authorResults.data.allAuthors}
        show={page === "authors"}
        isLogin={true}
      />

      <Books
        books={bookResults.data.allBooks}
        show={page === "books" || page === "recommended"}
        page={page}
        currentUserFavouriteGenre={currentUser.data.me.favouriteGenre}
      />

      <NewBook show={page === "add"} updateCacheWith={updateCacheWith} />
    </div>
  );
};

export default App;

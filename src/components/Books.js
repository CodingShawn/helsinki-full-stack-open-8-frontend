import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { ALL_BOOKS, CURRENT_USER } from "../queries";

const Books = (props) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [getBooks, results] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    getBooks({ variables: { genre: selectedFilter } });
  }, [selectedFilter]);

  useEffect(() => {
    if (results.data) {
      setFilteredBooks(results.data.allBooks);
      console.log(results.data.allBooks);
    }
  }, [results]);

  useEffect(() => {
    if (props.page === "recommended") {
      const favouriteGenre = props.currentUserFavouriteGenre;
      setSelectedFilter(favouriteGenre);
    } else {
      setSelectedFilter("");
    }
  }, [props.page]);

  if (!props.show) {
    return null;
  }

  const books = props.books;

  let genres = [];
  books.map((book) =>
    book.genres.map((genre) => (genres = genres.concat(genre)))
  );
  let uniqueGenres = [...new Set(genres)];

  if (props.page === "recommended") {
    return (
      <div>
        <h2>Recommendations</h2>
        <div>Books belonging to your favourite genres</div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filteredBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map((genre) => (
        <button key={genre} onClick={() => setSelectedFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setSelectedFilter("")}>All Genres</button>
    </div>
  );
};

export default Books;

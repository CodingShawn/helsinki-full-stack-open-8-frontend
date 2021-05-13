import React, { useState } from "react";

const Books = (props) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  if (!props.show) {
    return null;
  }

  const books = props.books;

  let genres = [];
  books.map((book) =>
    book.genres.map((genre) => (genres = genres.concat(genre)))
  );
  let uniqueGenres = [...new Set(genres)];

  let filteredBooks = books.filter((book) =>
    book.genres.find((genre) => genre === selectedFilter)
  );

  if (!selectedFilter) {
    filteredBooks = books;
  }

  return (
    <div>
      <h2>books</h2>

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

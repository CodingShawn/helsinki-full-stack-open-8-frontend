import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  function submit(event) {
    event.preventDefault();
    let bornToInt = Number(born);
    editAuthor({ variables: { name, setBornTo: bornToInt } });
    setName("");
    setBorn("");
  }

  if (!props.show) {
    return null;
  }

  const authors = props.authors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <h2>Set Birth Year</h2>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option>Choose an author</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {" "}
          Born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            type="text"
          />
        </div>

        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default Authors;

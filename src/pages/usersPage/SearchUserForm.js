import React, { useState } from "react";

export default function SearchUserForm({ setFilteredList }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setFilteredList(searchTerm);
    setSearchTerm("");
  };

  const handleReset = () => {
    window.location.reload();
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="d-flex justify-content-center">
          <input
            className="w-25"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Search user.."
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-secondary m-3" type="submit">
            Search
          </button>
          <button
            className="btn btn-danger m-3"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

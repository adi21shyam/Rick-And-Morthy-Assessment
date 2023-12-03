import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard/CharacterCard"; // Ensure this component is created
import styles from "./HomePage.module.css";

const HomePage = () => {
  // State for storing characters fetched from API
  const [characters, setCharacters] = useState([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State for total number of pages
  const [pages, setPages] = useState(0);
  // State for search query
  const [search, setSearch] = useState("");
  // State to handle debounce mechanism in search
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  // State for storing filter values
  const [filters, setFilters] = useState({
    status: "",
    species: "",
    type: "",
    gender: "",
  });

  // Function to fetch characters based on query parameters
  const fetchCharacters = async (queryParams) => {
    setIsLoading(true);
    try {
      const result = await axios(`https://rickandmortyapi.com/api/character/?${queryParams}`);
      setCharacters(result.data.results);
      setPages(result.data.info.pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setCharacters([]);
      setPages(0);
    }
    setIsLoading(false);
  };

  // useEffect hook to fetch characters whenever filters or page changes
  useEffect(() => {
    const queryParams = new URLSearchParams({
      page: currentPage,
      name: search,
      ...filters,
    }).toString();

    fetchCharacters(queryParams);
  }, [currentPage, search, filters]);

  // Function to handle debounced search input
  const debounceSearch = (event, debounceTimeout) => {
    const value = event.target.value;
    if (!value) return;
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      setSearch(value);
    }, 1000);
    setDebounceTimeout(timeout);
  };

  // Function to handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setCurrentPage(1);
  };

  // Functions to handle pagination
  const handlePrevPage = () => {
    setCurrentPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((currentPage) => Math.min(pages, currentPage + 1));
  };

  // Displaying current search and filters applied
  const displayFilters = Object.entries(filters)
    .filter(([key, value]) => value !== "")
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value.charAt(0).toUpperCase() + value.slice(1)}`)
    .join(", ");

  // Conditional rendering for loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headingInput}>
        <h1>Rick & Morty Characters</h1>
        <input type="text" placeholder="Search characters" className={styles.searchInput} onChange={(e) => debounceSearch(e, debounceTimeout)} />
      </div>

      {/* Filter Components */}
      <div className={styles.filters}>
        <select onChange={(e) => handleFilterChange("status", e.target.value)}>
          <option value="" disabled selected>
            Status
          </option>
          <option value="">None</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select onChange={(e) => handleFilterChange("species", e.target.value)}>
          <option value="" disabled selected>
            Species
          </option>
          <option value="">None</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          {/* Can be added more species options as needed */}
        </select>

        <select onChange={(e) => handleFilterChange("type", e.target.value)}>
          <option value="" disabled selected>
            Type
          </option>
          <option value="">None</option>
          <option value="Human with antennae">Human with antennae</option>
          <option value="Genetic experiment">Genetic experiment</option>
          <option value="Parasite">Parasite</option>
          {/* Can be added more based on data */}
        </select>

        <select onChange={(e) => handleFilterChange("gender", e.target.value)}>
          <option value="" disabled selected>
            Gender
          </option>
          <option value="">None</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className={styles.filterStatus}>
        <span>
          <span className={styles.filterLabel}>Name:</span>
          <span className={styles.filterContent}>{search.charAt(0).toUpperCase() + search.slice(1) || "None"}</span>
        </span>
        <span>
          <span className={styles.filterLabel}>Applied Filters:</span>
          <span className={styles.filterContent}>{displayFilters || "None"}</span>
        </span>
      </div>

      {/* Render Character Cards */}
      <div className={styles.card}>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === pages || characters.length === 0}>
          Next
        </button>
        <p>
          Page {currentPage} of {pages}
        </p>
      </div>
    </div>
  );
};

export default HomePage;

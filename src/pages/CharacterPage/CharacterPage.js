import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from "./CharacterPage.module.css"

const CharacterPage = () => {
  // Retrieve the character ID from the URL parameters
  const { id } = useParams();

  // State for storing the character's details
  const [character, setCharacter] = useState(null);

  // State to handle loading status during API call
  const [loading, setLoading] = useState(false);

  // useEffect hook to fetch character data on component mount or when 'id' changes
  useEffect(() => {
    // Function to fetch character data from the API
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        // Making a GET request to the Rick and Morty API
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        // Update state with the fetched character data
        setCharacter(response.data);
      } catch (error) {
        // Log error in case of a failed API call
        console.error('Error fetching character data: ', error);
      }
      setLoading(false);
    };

    // Invoke the fetch function
    fetchCharacter();
  }, [id]);

  // Render loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render message if no character data is found
  if (!character) {
    return <div>Character not found</div>;
  }

  // Main component render with character details
  return (
    <div className={styles.container}>
      {/* Display character's name as a heading */}
      <h1 className={styles.title}>{character.name}</h1>
      {/* Display character's image */}
      <img src={character.image} alt={character.name} className={styles.characterImage} />
      {/* Display character's details like species, gender, etc. */}
      <p className={styles.characterDetails}><strong>Species:</strong> {character.species}</p>
      <p className={styles.characterDetails}><strong>Gender:</strong> {character.gender}</p>
      <p className={styles.characterDetails}><strong>Status:</strong> {character.status}</p>
      <p className={styles.characterDetails}><strong>Origin:</strong> {character.origin.name}</p>
      <p className={styles.characterDetails}><strong>Location:</strong> {character.location.name}</p>
      {/* List episodes in which the character appears */}
      <div className={styles.episodesContainer}>
        <h2>Episodes</h2>
        {character.episode.map((episodeUrl, index) => (
          <div key={index} className={styles.episode}>Episode {episodeUrl.split('/').pop()}</div>
        ))}
      </div>
    </div>
  );
};

export default CharacterPage;

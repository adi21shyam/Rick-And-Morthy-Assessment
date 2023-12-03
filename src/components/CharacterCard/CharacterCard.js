import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CharacterCard.module.css';

// CharacterCard component for displaying individual character information
const CharacterCard = ({ character }) => {
  return (
    // Link to the character's detailed page using React Router 'Link'
    <Link to={`/character/${character.id}`} className={styles.cardLink}>
      {/* Card container for character information */}
      <div className={styles.card}>
        {/* Character image with alt text for accessibility */}
        <img src={character.image} alt={character.name} className={styles.characterImage} />
        {/* Character name displayed as a title */}
        <h2 className={styles.cardTitle}>{character.name}</h2>
        {/* Character species information */}
        <p className={styles.cardDetails}>Species: {character.species}</p>
        {/* Character status information */}
        <p className={styles.cardDetails}>Status: {character.status}</p>
      </div>
    </Link>
  );
};

export default CharacterCard;

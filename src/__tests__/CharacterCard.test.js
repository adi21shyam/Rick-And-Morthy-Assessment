import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterCard from './CharacterCard';
import { BrowserRouter } from 'react-router-dom';

describe('CharacterCard Tests', () => {
  it('renders character card', () => {
    const character = { id: 1, name: 'Rick', species: 'Human', status: 'Alive', image: 'rick_image_url' };
    render(
      <BrowserRouter>
        <CharacterCard character={character} />
      </BrowserRouter>
    );
    expect(screen.getByText('Rick')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });

});

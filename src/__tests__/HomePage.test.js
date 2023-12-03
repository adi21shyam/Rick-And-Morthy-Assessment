import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import HomePage from '../pages/HomePage/HomePage';
import CharacterCard from '../components/CharacterCard/CharacterCard';

jest.mock('axios');
jest.mock('../components/CharacterCard/CharacterCard');

describe('HomePage Tests', () => {
  const mockCharacters = [
    { id: 1, name: 'Rick', species: 'Human', status: 'Alive', image: 'rick_image_url' },
    { id: 2, name: 'Morty', species: 'Human', status: 'Alive', image: 'morty_image_url' }
  ];

  beforeEach(() => {
    CharacterCard.mockImplementation(({ character }) => <div>{character.name}</div>);
    axios.get.mockResolvedValue({ data: { results: mockCharacters, info: { pages: 2 } } });
  });

  it('renders loading state initially', () => {
    render(<HomePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders characters after successful API call', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('Rick')).toBeInTheDocument();
      expect(screen.getByText('Morty')).toBeInTheDocument();
    });
  });

  it('updates search state on input change', async () => {
    render(<HomePage />);
    fireEvent.change(screen.getByPlaceholderText(/search characters/i), { target: { value: 'Rick' } });
    await waitFor(() => {
      expect(screen.getByDisplayValue(/Rick/i)).toBeInTheDocument();
    });
  });

});

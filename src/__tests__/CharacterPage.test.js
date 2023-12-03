import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import CharacterPage from './CharacterPage';
import { useParams } from 'react-router-dom';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

describe('CharacterPage Tests', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' });
    axios.get.mockResolvedValue({
      data: {
        name: 'Rick',
        species: 'Human',
        gender: 'Male',
        status: 'Alive',
        origin: { name: 'Earth' },
        location: { name: 'Citadel of Ricks' },
        image: 'rick_image_url',
        episode: ['episode_1', 'episode_2']
      }
    });
  });

  it('renders character information', async () => {
    render(<CharacterPage />);
    await waitFor(() => {
      expect(screen.getByText('Rick')).toBeInTheDocument();
      expect(screen.getByText('Human')).toBeInTheDocument();
      expect(screen.getByText('Male')).toBeInTheDocument();
      expect(screen.getByText('Alive')).toBeInTheDocument();
      expect(screen.getByText('Earth')).toBeInTheDocument();
      expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    });
  });
});

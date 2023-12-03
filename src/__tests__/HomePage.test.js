import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import HomePage from '../pages/HomePage/HomePage';
import CharacterCard from '../../components/CharacterCard/CharacterCard';

jest.mock('axios');
jest.mock('../components/CharacterCard/CharacterCard', () => (props) => <div>CharacterCard - {props.character.name}</div>);



describe('HomePage', () => {
  it('renders loading state initially', () => {
    render(<HomePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders characters after successful API call', async () => {
    axios.get.mockResolvedValue({ data: { results: mockCharacters, info: { pages: 1 } } });
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('CharacterCard - Rick')).toBeInTheDocument();
      expect(screen.getByText('CharacterCard - Morty')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText(/character not found/i)).toBeInTheDocument();
    });
  });

  it('updates search state on input change', async () => {
    render(<HomePage />);
    const input = screen.getByPlaceholderText(/search characters/i);
    fireEvent.change(input, { target: { value: 'Rick' } });
    await waitFor(() => {
      expect(input.value).toBe('Rick');
    });
  });

  it('handles filter changes', async () => {
    render(<HomePage />);
    const select = screen.getByLabelText(/status/i);
    fireEvent.change(select, { target: { value: 'alive' } });
    await waitFor(() => {
      expect(select.value).toBe('alive');
    });
  });

  it('changes pages when next page button is clicked', async () => {
    render(<HomePage />);
    axios.get.mockResolvedValue({ data: { results: mockCharacters, info: { pages: 2 } } });
    const nextPageButton = screen.getByText(/next/i);
    fireEvent.click(nextPageButton);
    await waitFor(() => {
      expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();
    });
  });

  it('does not go to a previous page if on the first page', () => {
    render(<HomePage />);
    const prevPageButton = screen.getByText(/previous/i);
    fireEvent.click(prevPageButton);
    expect(screen.getByText(/page 1 of 0/i)).toBeInTheDocument();
  });
});

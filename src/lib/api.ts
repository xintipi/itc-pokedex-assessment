import {
  IPokemonListResponse,
  IPokemonDetail,
  ITypeListResponse,
  IPokemonByTypeResponse,
} from './types';

const API_BASE = 'https://pokeapi.co/api/v2';

// 1. Fetch Pokemon list (with default API pagination)
export async function fetchPokemons(limit = 20, offset = 0, signal?: AbortSignal): Promise<IPokemonListResponse> {
  const res = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`, { signal });
  if (!res.ok) throw new Error('Failed to fetch pokemons');
  return res.json();
}

// 2. Fetch single Pokemon details (using URL from the list)
export async function fetchPokemonDetail(url: string, signal?: AbortSignal): Promise<IPokemonDetail> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('Failed to fetch pokemon detail');
  return res.json();
}

// 3. Fetch all Pokemon types for the dropdown filter
export async function fetchPokemonTypes(signal?: AbortSignal): Promise<ITypeListResponse> {
  const res = await fetch(`${API_BASE}/type`, { signal });
  if (!res.ok) throw new Error('Failed to fetch types');
  return res.json();
}

// 4. Fetch Pokemons by type
// Note: This API returns the FULL array and does not support server-side pagination (limit/offset)
export async function fetchPokemonsByType(typeIdOrName: string, signal?: AbortSignal): Promise<IPokemonByTypeResponse> {
  const res = await fetch(`${API_BASE}/type/${typeIdOrName}`, { signal });
  if (!res.ok) throw new Error('Failed to fetch pokemons by type');
  return res.json();
}

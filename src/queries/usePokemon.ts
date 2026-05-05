import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchPokemons, fetchPokemonTypes, fetchPokemonDetail, fetchPokemonsByType } from '@/lib/api';

// Hook to fetch the list of Pokemon Types for the dropdown filter
export function usePokemonTypes() {
  return useQuery({
    queryKey: ['types'],
    queryFn: ({ signal }) => fetchPokemonTypes(signal),
  });
}

// Hook to fetch the paginated list of Pokemons, handling both "all" and specific types
export function usePokemonList(selectedTypes: string[], page: number, limit = 20) {
  const offset = page * limit;

  return useQuery({
    queryKey: ['pokemons', selectedTypes.join(','), page],
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => {
      // Case 1: No filter selected. Use standard server pagination API
      if (selectedTypes.length === 0 || selectedTypes[0] === 'all') {
        return fetchPokemons(limit, offset, signal);
      } 
      // Case 2: Filter selected. Handle pagination on the client side
      else {
        const typePromises = selectedTypes.map(type => fetchPokemonsByType(type, signal));
        const typeDataArray = await Promise.all(typePromises);
        
        // Intersection of all selected types
        let intersection = typeDataArray[0].pokemon.map(p => p.pokemon);
        
        for (let i = 1; i < typeDataArray.length; i++) {
            const currentTypePokemonNames = new Set(typeDataArray[i].pokemon.map(p => p.pokemon.name));
            intersection = intersection.filter(p => currentTypePokemonNames.has(p.name));
        }
        
        // Sort by ID to maintain order
        intersection.sort((a, b) => {
            const idA = parseInt(a.url.split('/').filter(Boolean).pop() || '0', 10);
            const idB = parseInt(b.url.split('/').filter(Boolean).pop() || '0', 10);
            return idA - idB;
        });

        // Slice the array to get exactly items for the current page
        const paginatedResults = intersection.slice(offset, offset + limit);

        return {
          count: intersection.length,
          results: paginatedResults,
          next: offset + limit < intersection.length ? 'has_next' : null,
          previous: offset > 0 ? 'has_prev' : null,
        };
      }
    },
  });
}

// Hook to fetch details for a single Pokemon using its URL
export function usePokemonDetail(url: string) {
  return useQuery({
    queryKey: ['pokemon', url],
    queryFn: ({ signal }) => fetchPokemonDetail(url, signal),
  });
}

'use client';

import { usePokemonList } from '@/queries/usePokemon';
import { PokemonCard } from './PokemonCard';
import { useQueryState, parseAsInteger, parseAsArrayOf, parseAsString } from 'nuqs';
import { cn } from '@/lib/utils';
import { ITypeListResponse } from '@/lib/types';

interface PokemonCatalogProps {
  initialTypes: ITypeListResponse;
}

export function PokemonCatalog({ initialTypes }: PokemonCatalogProps) {
  const [pageParam, setPageParam] = useQueryState('page', parseAsInteger.withDefault(1));
  const [selectedTypes, setSelectedTypes] = useQueryState('type', parseAsArrayOf(parseAsString).withDefault([]));
  
  const page = Math.max(0, pageParam - 1);
  const limit = 24; // Screenshot shows 6 columns x 4 rows = 24 items per page

  const { data, isLoading, isError } = usePokemonList(selectedTypes, page, limit);

  const handleTypeChange = (type: string) => {
    let newTypes = [...selectedTypes];
    if (newTypes.includes(type)) {
      newTypes = newTypes.filter(t => t !== type);
    } else {
      newTypes.push(type);
    }
    
    setSelectedTypes(newTypes.length > 0 ? newTypes : null, { scroll: false });
    setPageParam(1, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    setPageParam(newPage + 1, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-4 px-10">
      <p className="text-center">Welcome to Pokemon world</p>
      
      <p>Total count: {data?.count ?? 0}</p>

      <section className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <span>Types:</span>
        {initialTypes.results.map((type) => {
          const isSelected = selectedTypes.includes(type.name);
          return (
            <button 
              key={type.name}
              onClick={() => handleTypeChange(type.name)}
              className={cn(
                "border p-4",
                isSelected && "bg-blue-500 text-white"
              )}
            >
              {type.name}
            </button>
          );
        })}
      </section>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-4">
          {[...Array(24)].map((_, i) => (
             <div key={i} className="h-32 animate-pulse bg-gray-50 flex flex-col items-center"></div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-10 text-red-500">Failed to load</div>
      ) : data?.results.length === 0 ? (
        <div className="text-center py-10">No Pokemons found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-4">
          {data?.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} url={pokemon.url} priority={true} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-16 pb-10">
        {page > 0 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-6 py-2 bg-[#3b82f6] text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>
        )}
        {data?.next && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-6 py-2 bg-[#3b82f6] text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

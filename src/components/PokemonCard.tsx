'use client';

import { usePokemonDetail } from '@/queries/usePokemon';
import Image from 'next/image';

export function PokemonCard({ url, priority = false }: { url: string; priority?: boolean }) {
  const { data: pokemon, isLoading, error } = usePokemonDetail(url);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full animate-pulse my-2"></div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="flex items-center justify-center text-red-500">
        Failed
      </div>
    );
  }

  const imageSrc = pokemon.sprites.other?.showdown?.front_default || pokemon.sprites.front_default;

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm mb-2">{pokemon.name}</div>
      {imageSrc ? (
        <div className="relative w-24 h-24 mb-2">
          <Image
            src={imageSrc}
            alt={pokemon.name}
            fill
            className="object-contain"
            sizes="96px"
            priority={priority}
            unoptimized
          />
        </div>
      ) : (
        <div className="w-24 h-24 mb-2 flex items-center justify-center text-xs text-gray-400">
          No image
        </div>
      )}
      <div className="text-sm">
        Number: {pokemon.id}
      </div>
    </div>
  );
}

import { PokemonCatalog } from "@/components/PokemonCatalog";
import { Suspense } from "react";
import { fetchPokemonTypes } from "@/lib/api";

export default async function PokemonPage() {
  // Fetch static types data on the Server Component
  const typesData = await fetchPokemonTypes();

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <PokemonCatalog initialTypes={typesData} />
      </Suspense>
    </main>
  );
}

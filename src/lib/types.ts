export interface IPokemonListItem {
  name: string;
  url: string;
}

export interface IPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonListItem[];
}

export interface IPokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface IPokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
      showdown?: {
        front_default: string;
      };
    };
  };
  types: IPokemonType[];
}

export interface ITypeListItem {
  name: string;
  url: string;
}

export interface ITypeListResponse {
  count: number;
  results: ITypeListItem[];
}

export interface IPokemonByTypeResponse {
  pokemon: {
    pokemon: IPokemonListItem;
    slot: number;
  }[];
}

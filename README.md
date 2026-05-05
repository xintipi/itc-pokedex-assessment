# ITC Pokedex

This is a Pokedex web application for the IT Consultis technical test. I built it with a clean design, fast speed, and modern code.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TailwindCSS
- TanStack Query (React Query)
- nuqs (to save state in the URL)

## How to run the project

**Note:** You need Node.js version 20 or higher.

1. Clone this project to your computer.
2. Open your terminal and install the packages:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:3000`.

## Key Features

- **Server & Client Components:** I used a Server Component (`page.tsx`) to fetch the static Pokemon Types list on the server. Then, I passed it to a Client Component (`PokemonCatalog.tsx`) to handle dynamic user interactions like pagination and filtering. This shows a deep understanding of Next.js architecture.
- **URL State:** The page number and selected types are saved in the URL using `nuqs`. You can refresh the page or share the link without losing data.
- **Multi-Type Filter:** You can select many types at the same time. The app will only show Pokemons that have ALL the selected types. This filtering is done on the frontend.
- **Pagination:** The app shows 24 Pokemons per page (in a 6x4 grid) to match the design.
- **Fast Performance:** 
  - The first 12 images load instantly because of the `priority` tag.
  - `React Query` caches the data, so moving between pages is very fast and smooth.
- **Network Safety:** If you click "Next" very fast, the old API calls are canceled using `AbortSignal`. This saves internet data and prevents bugs.
- **Animations:** The app uses moving GIF images from PokeAPI to make the design look alive.

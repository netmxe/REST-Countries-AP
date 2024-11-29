<script>
  import { onMount } from 'svelte';
  import { Moon } from 'lucide-svelte';
  import NavBar from '$components/NavBar.svelte';
  import CardFlag from '$components/CardFlag.svelte';
  import '$styles/app.css';

  let countries = [];
  let searchQuery = '';
  let selectedRegion = '';
  // Format population number with commas

  // Filter countries based on search and region
  $: filteredCountries = countries
    .filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedRegion || country.region === selectedRegion)
    );

  onMount(async () => {
    try {
      const response = await fetch('/data.json'); // Chemin relatif à la racine du projet
      const rawData = await response.json();
      countries = rawData.map(country => ({
        name: country.name,
        population: country.population,
        region: country.region,
        capital: country.capital || 'N/A',
        flags: country.flags
      }));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  });
</script>



<div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
  <!-- Header -->
  <NavBar />
  <!-- Search and Filter Section -->
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between gap-4">
      <div class="relative flex-1 max-w-md">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search for a country..."
          class="w-full px-4 py-3 pl-12 rounded-md shadow-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <select
        bind:value={selectedRegion}
        class="px-4 py-3 rounded-md shadow-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  </div>

  <!-- Countries Grid -->
  <div class="container mx-auto px-4 pb-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
      {#each filteredCountries as country}
        <CardFlag name={country.name} population={country.population} region={country.region} capital={country.capital} flag={country.flags.png} />
      {/each}
    </div>
  </div>
</div>

<style>
  :global(html.dark) {
    color-scheme: dark;
  }

  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>

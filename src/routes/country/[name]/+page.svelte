<script>
  import { onMount } from 'svelte';
  import { Moon, ArrowLeft } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import NavBar from '$components/NavBar.svelte';

  $: countryName = $page.params.name; // This will be passed from the parent/router
  let country = null;
  let borderCountries = [];
  let darkMode = false;

  // Format population number with commas
  const formatPopulation = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  onMount(async () => {
    try {
      const response = await fetch('/data.json');
      const data = await response.json();
      country = data.find(c => c.name === countryName);

      if (country?.borders) {
        borderCountries = data
          .filter(c => country.borders.includes(c.alpha3Code))
          .map(c => c.name);
      }
    } catch (error) {
      console.error('Error loading country data:', error);
    }
  });

  const goToHome = () => {
    goto('/'); // Navigue vers la page d'accueil
  };
</script>

<div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
  <NavBar />
  <!-- Main Content -->
  <main class="container mx-auto px-4 py-8">
    <!-- Back Button -->
    <button
      on:click={goToHome}
      class="mb-12 px-8 py-2 bg-white dark:bg-gray-800 shadow-md rounded-md flex items-center gap-2 text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <ArrowLeft class="w-4 h-4" />
      <span>Back</span>
    </button>
    {#if country}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Flag -->
        <img
          src={country.flags.svg || country.flags.png}
          alt={`Flag of ${country.name}`}
          class="w-full h-auto shadow-md"
        />

        <!-- Country Details -->
        <div class="space-y-8">
          <h2 class="text-3xl font-bold dark:text-white">{country.name}</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-2 dark:text-gray-300">
              <p><span class="font-semibold">Native Name:</span> {country.nativeName}</p>
              <p><span class="font-semibold">Population:</span> {formatPopulation(country.population)}</p>
              <p><span class="font-semibold">Region:</span> {country.region}</p>
              <p><span class="font-semibold">Sub Region:</span> {country.subregion}</p>
              <p><span class="font-semibold">Capital:</span> {country.capital}</p>
            </div>

            <div class="space-y-2 dark:text-gray-300">
              <p><span class="font-semibold">Top Level Domain:</span> {country.topLevelDomain?.join(', ')}</p>
              <p><span class="font-semibold">Currencies:</span> {country.currencies?.map(c => c.name).join(', ')}</p>
              <p><span class="font-semibold">Languages:</span> {country.languages?.map(l => l.name).join(', ')}</p>
            </div>
          </div>

          {#if borderCountries.length > 0}
            <div class="flex flex-wrap items-center gap-4 dark:text-white">
              <span class="font-semibold">Border Countries:</span>
              <div class="flex flex-wrap gap-2">
                {#each borderCountries as border}
                  <span class="px-4 py-1 bg-white dark:bg-gray-800 shadow-md rounded text-sm">
                    {border}
                  </span>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="text-center dark:text-white">Loading...</div>
    {/if}
  </main>
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

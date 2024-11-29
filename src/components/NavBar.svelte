<script>
  import { Moon } from 'lucide-svelte';

  // Déclarer une variable pour suivre l'état du mode sombre
  let darkMode = false;

  // Fonction pour basculer le mode sombre
  const toggleDarkMode = () => {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark');
  };
</script>

<header class="bg-white dark:bg-gray-800 shadow-md">
  <div class="container mx-auto px-4 py-6 flex justify-between items-center">
    <h1 class="text-2xl font-bold dark:text-white">Where in the world?</h1>
    <button
      on:click={toggleDarkMode}
      class="flex items-center gap-2 text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
    >
      <Moon class="w-4 h-4" />
      <span>Dark Mode</span>
    </button>
  </div>
</header>

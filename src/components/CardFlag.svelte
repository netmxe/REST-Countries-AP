 <script>
    export let name;
    export let population;
    export let region;
    export let capital;
    export let flag;

    const formatPopulation = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
</script>

 <a href={`/country/${name}`} class="cursor-pointer">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img
        src={flag}
        alt={`Flag of ${name}`}
        class="w-full h-48 object-cover"
    />
    <div class="p-6">
        <h2 class="text-lg font-bold mb-4 dark:text-white">{name}</h2>
        <div class="space-y-2 text-sm dark:text-gray-300">
        <p><span class="font-semibold">Population:</span> {formatPopulation(population)}</p>
        <p><span class="font-semibold">Region:</span> {region}</p>
        <p><span class="font-semibold">Capital:</span> {capital}</p>
        </div>
    </div>
    </div>
</a>

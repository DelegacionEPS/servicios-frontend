<script lang="ts">
    import { goto } from "$app/navigation"
    import { QuestionCircleSolid } from "flowbite-svelte-icons"
    import { onMount } from "svelte"
    import { browser } from "$app/environment"
    import type { PageData } from "./$types"

    // Components for occupancy visualization
    import OccupancyBar from "./OccupancyBar.svelte"
    import OccupancyCircle from "./OccupancyCircle.svelte"

    // Building data
    const buildings = [
        {
            id: 1,
            name: "Edificio 1:\nAgustín de Betancourt",
            image: "edificios/1-betancourt.webp",
            href: "/taquillas/1"
        },
        {
            id: 2,
            name: "Edificio 2:\nSabatini",
            image: "edificios/2-sabatini.webp",
            href: "/taquillas/2"
        },
        {
            id: 4,
            name: "Edificio 4:\nTorres Quevedo",
            image: "edificios/4-Torres_Quevedo.webp",
            href: "/taquillas/4"
        },
        {
            id: 7,
            name: "Edificio 7:\nJuan Benet",
            image: "edificios/7-Juan_Benet.webp",
            href: "/taquillas/7"
        }
    ]

    // State for help tooltip
    let showHelp = false
    let mounted = false

    // Handle building selection
    const selectBuilding = (href: string) => {
        goto(href)
    }

    export let data: PageData

    // Calculate occupancy percentage for each building
    const getOccupancyPercentage = (buildingId: number) => {
        const occupied = data.ocupancy[buildingId]
        const total = data.size[buildingId].total
        return Math.round((occupied / total) * 100)
    }

    onMount(() => {
        mounted = true
    })
</script>

<div class="container mx-auto px-4 py-8 max-w-6xl">
    <h1
        class="text-3xl sm:text-4xl lg:text-5xl text-center font-montserrat mb-8 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
        Selección de Edificio
    </h1>

    <!-- Help button -->
    <div class="flex justify-center mb-6">
        <button
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary shadow-md hover:shadow-lg transition-shadow text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary"
            on:click={() => (showHelp = !showHelp)}>
            <QuestionCircleSolid class="h-5 w-5" />
            <span>Ayuda</span>
        </button>
    </div>

    <!-- Help tooltip -->
    {#if showHelp}
        <div class="relative mb-8">
            <div
                class="mx-auto max-w-2xl p-4 rounded-lg bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary shadow-lg text-black dark:text-white recompensa:text-white">
                <h3 class="font-bold text-lg mb-2">Tutorial Taquillas - Selección de Edificio</h3>
                <p>
                    Selecciona el edificio donde quieres reservar la taquilla haciendo clic en la
                    tarjeta correspondiente. Cada tarjeta muestra una imagen y el nombre del
                    edificio.
                </p>
                <button
                    class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                    on:click={() => (showHelp = false)}>
                    ✕
                </button>
            </div>
        </div>
    {/if}

    <!-- Building grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each buildings as building}
            <div
                class="building-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary"
                on:click={() => selectBuilding(building.href)}
                on:keydown={e => e.key === "Enter" && selectBuilding(building.href)}
                tabindex="0"
                role="button"
                aria-label={`Seleccionar ${building.name}`}>
                <div class="relative h-48 overflow-hidden">
                    <img
                        src={building.image || "/placeholder.svg"}
                        alt={building.name}
                        class="w-full h-full object-cover transition-transform hover:scale-110" />
                    <div
                        class="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-opacity">
                    </div>
                </div>
                <div class="p-4">
                    <h2
                        class="text-lg font-semibold text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary whitespace-pre-line">
                        {building.name}
                    </h2>

                    <!-- Occupancy Graphic -->
                    <div class="mt-3">
                        <div class="flex items-center justify-between mb-1">
                            <span
                                class="text-sm font-medium text-gray-700 dark:text-gray-300 recompensa:text-gray-200">
                                Edificio {building.id} - Ocupación
                            </span>
                            <span
                                class="text-sm font-medium text-gray-700 dark:text-gray-300 recompensa:text-gray-200">
                                {data.ocupancy[building.id]}/{data.size[building.id].total}
                            </span>
                        </div>

                        <!-- Animated progress bar component -->
                        {#if mounted}
                            <OccupancyBar percentage={getOccupancyPercentage(building.id)} />

                            <!-- Circular indicator component -->
                            <div class="flex items-center justify-center mt-3">
                                <OccupancyCircle percentage={getOccupancyPercentage(building.id)} />
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .building-card:focus {
        outline: 2px solid var(--dele-color, #4a90e2);
    }

    .dark .building-card:focus {
        outline: 2px solid var(--dark-primary, #bb86fc);
    }

    .recompensa .building-card:focus {
        outline: 2px solid var(--recompensa-primary, #f48fb1);
    }

    /* Ensure the cards have a consistent aspect ratio */
    @media (max-width: 640px) {
        .building-card .relative {
            height: 200px;
        }
    }
</style>

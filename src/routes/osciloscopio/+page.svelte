<script lang="ts">
    import { Gallery, Thumbnails, Carousel, Popover, Button } from "flowbite-svelte"
    import { QuestionCircleSolid } from "flowbite-svelte-icons"
    import { goto } from "$app/navigation"
    import type { PageData } from "./$types"
    export let data: PageData

    let disponibilidad_osciloscopio: any[] = []
    data.osciloscopio.then(value => {
        disponibilidad_osciloscopio = Object.entries(value)
    })

    let showHelp = false
</script>

<h1
    class="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl text-center font-montserrat mt-4 mb-8 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
    Selección de Puesto
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
            <h3 class="font-bold text-lg mb-2">
                Tutorial Puestos de Electrónica - Selección de Puesto
            </h3>
            <p>
                Primero, selecciona el puesto sobre el que quieres realizar la reserva. En
                delegación, contamos con tres puestos de electrónica, los tres igualmente equipados.
            </p>
        </div>
    </div>
{/if}

<div class="grid grid-cols-1 place-items-center w-screen mt-6 mb-6">
    {#if disponibilidad_osciloscopio.length > 0}
        {#each disponibilidad_osciloscopio as puesto}
            {#if puesto[1]}
                <Button
                    class="text-white sm:text-3xl text-2xl px-8 py-3 bg-dele-color mb-2 rounded-2xl hover:bg-dele-accent dark:hover:bg-dark-accent hover:recompensa:bg-recompensa-accent dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary"
                    href={"/osciloscopio/" + puesto[0]}>
                    {"Puesto " + puesto[0]}
                </Button>
            {:else}
                <p
                    class="text-white sm:text-3xl text-2xl px-8 py-3 bg-dele-color mb-2 rounded-2xl hover:bg-dele-accent dark:hover:bg-dark-accent hover:recompensa:bg-recompensa-accent dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary">
                    {"Puesto " + puesto[0]} no disponible
                </p>
            {/if}
        {/each}
    {/if}
</div>

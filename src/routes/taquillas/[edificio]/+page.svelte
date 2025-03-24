<script lang="ts">
    import type { PageData } from "./$types"
    import { Popover, Button } from "flowbite-svelte"
    import { QuestionCircleSolid } from "flowbite-svelte-icons"
    export let data: PageData

    const building = data.edificio
    const pisos = data.pisos.reverse()

    // Para hacerlo responsive, así se sacan las dimensiones de la ventana
    $: outerWidth = 0
    $: innerWidth = 0
    $: outerHeight = 0
    $: innerHeight = 0

    // SEO friendly page title and description
    const pageTitle = `Selección de Piso - Edificio ${building} | Taquillas UC3M`
    const pageDescription = `Selecciona el piso del Edificio ${building} donde quieres reservar una taquilla en la Universidad Carlos III de Madrid.`
    const pageKeywords = `taquillas, reserva taquilla, UC3M, Universidad Carlos III, edificio ${building}, pisos, selección piso`
</script>

<svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight />

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta name="keywords" content={pageKeywords} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={`https://yourwebsite.com/taquillas/${building}`} />
</svelte:head>

<header>
    <h1
        class="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl text-center font-montserrat mt-4 mb-8 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
        Selección de Piso - Edificio {building}
    </h1>
</header>

<main>
    <section
        aria-labelledby="tutorial-section"
        class="w-screen grid grid-cols-1 place-items-center mb-4">
        <Button
            id="pop_edificio"
            class="dark:text-dark-primary dark:hover:text-dark-accent recompensa:text-recompensa-primary hover:recompensa:text-recompensa-accent text-dele-color hover:text-dele-accent"
            aria-label="Abrir tutorial">
            <QuestionCircleSolid class="md:h-8 md:w-8 h-10 w-10" />
        </Button>
    </section>

    <Popover
        class="text-black dark:text-white dark:bg-dark-secondary recompensa:text-white recompensa:bg-recompensa-secondary md:w-1/3 sm:w-1/2 w-10/12 sm:text-md text-sm"
        title="Tutorial Taquillas - Selección de Piso"
        triggeredBy="#pop_edificio">
        Ahora, selecciona la piso donde se encuentra la taquilla que quieres reservar.
    </Popover>

    <section aria-labelledby="pisos-section" class="flex flex-col items-center mb-6">
        <h2 id="pisos-section" class="sr-only">Listado de Pisos Disponibles</h2>
        <!-- Screen reader only -->
        {#each pisos as i}
            <article>
                <a
                    href="{building}/{i}"
                    data-sveltekit-preload-data="off"
                    class="flex justify-center group relative"
                    aria-label={`Seleccionar Piso ${i} del Edificio ${building}`}>
                    <img
                        src={`../edificios/${data.edificio}/${i}.webp`}
                        class="object-cover w-auto group-hover:opacity-60 transition duration-300 ease-in-out"
                        alt={`Vista del Piso ${i} del Edificio ${building}`}
                        width="800"
                        height="450" />
                    <h2
                        class="absolute left-1/2 top-1/2 md:text-3xl sm:text-lg text-sm text-dele-color px-6 py-2 rounded block dark:text-dark-primary recompensa:text-recompensa-primary"
                        style="transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.8)">
                        Piso {i}
                    </h2>
                </a>
            </article>
        {/each}
    </section>
</main>

<hline></hline>

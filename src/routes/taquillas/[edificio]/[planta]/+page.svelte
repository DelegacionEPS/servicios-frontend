<script lang="ts">
    import type { PageData } from "./$types"
    import {
        Button,
        Dropdown,
        Radio,
        ButtonGroup,
        Toast,
        Popover,
        Indicator,
        Card
    } from "flowbite-svelte"
    import {
        ChevronDownOutline,
        ArrowLeftOutline,
        ArrowRightOutline,
        CloseCircleSolid,
        CheckCircleSolid,
        QuestionCircleSolid
    } from "flowbite-svelte-icons"
    import TablaTaquillas from "../../../../TablaTaquillas.svelte"
    import { Confetti } from "svelte-confetti"

    export let data: PageData

    const floor_size = Object.keys(data.size[data.edificio][data.planta])

    let block = 1
    let openDropdown = false

    let ocupacionBloques: any[]
    let drawBlocks = false

    let urlMapa = `/mapas/${data.edificio}.${data.planta}.webp`

    // SEO friendly page title and description
    const pageTitle = `Selección de Taquilla - Edificio ${data.edificio} - Planta ${data.planta} | UC3M`
    const pageDescription = `Selecciona y reserva tu taquilla en el Edificio ${data.edificio}, Planta ${data.planta} de la Universidad Carlos III de Madrid.`
    const pageKeywords = `taquillas, reserva taquilla, UC3M, Universidad Carlos III, edificio ${data.edificio}, planta ${data.planta}, bloques taquillas`

    data.bloques.then(value => {
        ocupacionBloques = value
        drawBlocks = true
    })

    function closeModalAssignBlock(block_selected: string) {
        openDropdown = false
        block = parseInt(block_selected)
    }

    function substractBlock() {
        block -= 1
        if (block < 1) {
            block = floor_size.length
        }
    }

    function addBlock() {
        block += 1
        if (block > floor_size.length) {
            block = 1
        }
    }

    function handleReload() {
        setTimeout(() => {
            location.reload()
        }, 2000)
    }

    function clearForm(time: number) {
        setTimeout(() => {
            form = null
        }, time)
    }

    export let form

    // State for help tooltip
    let showHelp = false
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta name="keywords" content={pageKeywords} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
    <meta name="robots" content="index, follow" />
    <link
        rel="canonical"
        href={`https://yourwebsite.com/taquillas/${data.edificio}/${data.planta}`} />
</svelte:head>

<header>
    <h1
        class="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl text-center font-montserrat mt-4 mb-4 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
        Selección de Taquilla
    </h1>
    <h3
        class="text-xl sm:text-2xl lg:text-3xl xl:text-5xl text-center font-montserrat mt-4 mb-4 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
        Edificio {data.edificio} - Planta {data.planta}
    </h3>
</header>

<main>
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
                <h3 class="font-bold text-lg mb-2">Tutorial Taquillas - Selección de Taquilla</h3>
                <p>
                    Por último, tienes que buscar la taquilla seleccionando el bloque donde se
                    encuentra la misma. Para cambiar entre bloques, puedes usar el menú desplegable
                    o los botones inferiores. Además, tienes un mapa al final de la página para
                    ayudarte a seleccionar el bloque.
                    <br />
                    <br />
                    <b>
                        Recuerda hacer login en una cuenta de la UC3M para reservar la taquilla.
                        <b></b>
                    </b>
                </p>
            </div>
        </div>
    {/if}

    <section
        aria-labelledby="bloque-selector"
        class="w-screen h-full grid grid-rows-1 place-items-center">
        <h2 id="bloque-selector" class="sr-only">Selector de Bloque</h2>
        <Button
            size="lg"
            class="w-1/10 bg-dele-color hover:bg-dele-accent dark:bg-dark-primary dark:hover:bg-dark-accent recompensa:bg-recompensa-primary hover:recompensa:bg-recompensa-accent">
            Bloque {block}
            <ChevronDownOutline class="w-6 h-6 ms-2 text-black dark:text-red-500" />
        </Button>
        <Dropdown bind:open={openDropdown} class="recompensa:bg-recompensa-secondary">
            <div slot="header" class="px-4 py-2 recompensa:bg-recompensa-secondary">
                <span class="block text-sm text-gray-900 dark:text-white recompensa:text-white">
                    Selecciona un bloque
                </span>
            </div>
            {#each floor_size as bloque}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <li
                    class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600 recompensa:bg-recompensa-secondary hover:recompensa:bg-recompensa-accent"
                    on:click={() => closeModalAssignBlock(bloque)}>
                    <Radio
                        name="block"
                        bind:group={block}
                        value={bloque}
                        class="recompensa:text-white">
                        Bloque {bloque}
                    </Radio>
                </li>
            {/each}
        </Dropdown>
    </section>

    {#if drawBlocks}
        <section aria-labelledby="taquillas-legend" class="grid grid-cols-1 place-self-center mt-6">
            <h2 id="taquillas-legend" class="sr-only">Leyenda de Taquillas</h2>
            <div
                class="w-auto m-auto dark:text-white recompensa:text-white grid sm:grid-cols-4 grid-cols-2">
                <span class="flex items-center">
                    <Indicator size="lg" color="green" class="me-1.5" />Libre
                </span>
                <span class="flex items-center">
                    <Indicator size="lg" color="yellow" class="me-1.5" />Reservada
                </span>
                <span class="flex items-center">
                    <Indicator size="lg" color="red" class="me-1.5" />Ocupada
                </span>
                <span class="flex items-center">
                    <Indicator size="lg" color="dark" class="me-1.5" />No Disponible
                </span>
            </div>
        </section>
        <section aria-labelledby="tabla-taquillas">
            <h2 id="tabla-taquillas" class="sr-only">Tabla de Taquillas</h2>
            <TablaTaquillas bind:ocupacion_bloques={ocupacionBloques} bind:block bind:data
            ></TablaTaquillas>
        </section>
        <section
            aria-labelledby="navegacion-bloques"
            class="w-screen h-auto grid grid-rows-1 place-items-center mt-6">
            <h2 id="navegacion-bloques" class="sr-only">Navegación entre Bloques</h2>
            <ButtonGroup class="space-x-px">
                <Button
                    pill
                    class="dark:bg-dark-primary dark:hover:bg-dark-accent recompensa:bg-recompensa-primary hover:recompensa:bg-recompensa-accent bg-[#3BC4A0] hover:bg-[#FF6D2E] recompensa:border-black"
                    on:click={() => substractBlock()}
                    aria-label="Bloque anterior">
                    <ArrowLeftOutline />
                </Button>
                <Button
                    pill
                    class="dark:bg-dark-primary dark:hover:bg-dark-accent recompensa:bg-recompensa-primary
                    hover:recompensa:bg-recompensa-accent bg-[#3BC4A0] hover:bg-[#FF6D2E] recompensa:border-black"
                    on:click={() => addBlock()}
                    aria-label="Bloque siguiente">
                    <ArrowRightOutline />
                </Button>
            </ButtonGroup>
        </section>
        <section
            aria-labelledby="mapa-edificio"
            class="w-screen grid grid-rows-1 place-items-center px-4 mt-6 mb-6">
            <h2 id="mapa-edificio" class="sr-only">Mapa del Edificio</h2>
            <img
                src={urlMapa}
                alt={`Mapa del Edificio ${data.edificio}, Planta ${data.planta} con distribución de bloques de taquillas`}
                class="max-w-[800px] md:w-7/12 w-10/12 dark:invert" />
        </section>
    {:else}
        <p class="text-center p-6 dark:text-dark-primary recompensa:text-recompensa-primary">
            Cargando información de taquillas...
        </p>
    {/if}

    {#if form}
        {#if form.message.includes("Error")}
            <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dashed border-4 border-red-500 dark:border-red-500 recompensa:border-red-500 p-4 mx-auto text-center"
                role="alert">
                <Card
                    class="text-white bg-red-500 dark:text-white dark:bg-red-500 recompensa:text-white recompensa:border-red-500">
                    <p class="p-2">{form.message}</p>
                </Card>
            </div>
            <div class="text-white dark:text-dark-background recompensa:text-recompensa-background">
                {clearForm(2000)}
            </div>
        {:else}
            <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dashed border-4 border-green-500 dark:border-green-500 recompensa:border-green-500 p-4 mx-auto text-center"
                role="status">
                <Card
                    class="text-white bg-green-500 dark:text-white dark:bg-green-500 recompensa:text-white recompensa:bg-green-500">
                    <p class="p-2">{form.message}</p>
                </Card>
                <Confetti amount={500} x={[-0.5, 3.5]} delay={[0, 2000]} duration={2000} infinite />
            </div>
            <div class="text-white dark:text-dark-background recompensa:text-recompensa-background">
                {handleReload()}
            </div>
        {/if}
    {/if}
</main>

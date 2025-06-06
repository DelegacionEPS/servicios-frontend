<script lang="ts">
    import { goto } from "$app/navigation"
    import { _handleResult } from "./+page.ts"
    import { Popover, Button, Card } from "flowbite-svelte"
    import { QuestionCircleSolid } from "flowbite-svelte-icons"

    let buildings = [
        {
            id: 1,
            name: "Agustín de Betancourt",
            image: "edificios/1-betancourt.webp",
            href: "/taquillas/1"
        },
        {
            id: 2,
            name: "Sabatini",
            image: "edificios/2-sabatini.webp",
            href: "/taquillas/2"
        },
        {
            id: 4,
            name: "Torres Quevedo",
            image: "edificios/4-Torres_Quevedo.webp",
            href: "/taquillas/4"
        },
        {
            id: 7,
            name: "Juan Benet",
            image: "edificios/7-Juan_Benet.webp",
            href: "/taquillas/7"
        }
    ]
</script>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
        <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-montserrat text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
            Selección de Edificio
        </h1>

        <Button
            id="pop_edificio"
            class="dark:text-dark-primary dark:hover:text-dark-accent recompensa:text-recompensa-primary hover:recompensa:text-recompensa-accent text-dele-color hover:text-dele-accent">
            <QuestionCircleSolid class="md:h-8 md:w-8 h-6 w-6" />
        </Button>
    </div>

    <Popover
        class="text-black dark:text-white dark:bg-dark-secondary recompensa:text-white recompensa:bg-recompensa-secondary md:w-1/3 sm:w-1/2 w-10/12 sm:text-md text-sm mr-8 "
        title="Tutorial Taquillas - Selección de Edificio"
        triggeredBy="#pop_edificio"
        placement="bottom"
        style="z-index: 50;">
        Selecciona el edificio donde quieres reservar tu taquilla haciendo clic en la tarjeta
        correspondiente. Cada tarjeta muestra una imagen del edificio y su nombre.
    </Popover>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 place-items-center">
        {#each buildings as building}
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="cursor-pointer transform transition-transform duration-300 hover:scale-105 w-full max-w-sm"
                on:click={() => goto(building.href)}
                on:keydown={e => e.key === "Enter" && goto(building.href)}
                tabindex="0">
                <Card padding="none" class="h-full overflow-hidden shadow-lg hover:shadow-xl">
                    <div class="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                        <img
                            src={building.image}
                            alt={`Edificio ${building.id}. ${building.name}`}
                            class="w-full h-full object-cover transition-all duration-300 hover:brightness-90" />
                        <div
                            class="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                            <div class="text-center px-4 py-2 bg-black bg-opacity-70 rounded">
                                <span class="text-lg font-semibold text-white">
                                    Edificio {building.id}
                                </span>
                                <h3 class="text-xl sm:text-2xl font-bold text-white">
                                    {building.name}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 bg-white dark:bg-gray-800 text-center">
                        <Button
                            color="primary"
                            class="w-full hover:scale-105 transition-transform duration-300 text-black dark:text-white recompensa:text-white">
                            Seleccionar Edificio {building.id}
                        </Button>
                    </div>
                </Card>
            </div>
        {/each}
    </div>
</div>

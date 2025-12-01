<script lang="ts">
    /** @type {import('./$types').ActionData | any} */
    import { page } from "$app/stores"
    import { Tabs, TabItem, Input, Label, Button, Modal, Card } from "flowbite-svelte"
    import ModalIniciaSesion from "../../ModalIniciaSesion.svelte"
    import { goto } from "$app/navigation"

    let session = $page.data.session
    let reservas = $page.data.reservas.reservas
    let osciloscopios = $page.data.osciloscopios.reservas

    // Reactive statement to update session whenever $page.data.session changes
    $: session = $page.data.session
    
    let deleteModal
    let currentReserva
    let successToast = false
    let unSuccessToast = false

    // Esta función asigna la reserva clicada a 'currentReserva' y abre el modal.
    function openDeleteModal(reserva) {
        currentReserva = reserva
        deleteModal = true
    }

    // Se llama desde el botón de confirmación dentro del Modal.
    async function eliminar_reserva() {
        // Call a function that only runs in the server side:
        let res_email = session?.user?.email || ""

        const response = await fetch("/api/eliminar_reserva_osciloscopio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Usa los datos que están guardados en currentReserva
                puesto: currentReserva["puesto"],
                hora: currentReserva["hora"],
                fecha: currentReserva["fecha"],
                email: res_email
            })
        })

        let result = await response.json()
        result = result["result"]["message"]
        if (result.includes("eliminada")) {
            successToast = true
            setTimeout(() => {
                successToast = false
                location.reload()
            }, 1000)
        } else {
            unSuccessToast = true
        }
    }
</script>

<h1
    class="text-4xl text-center text-dele-color m-5 dark:bg-dark-background dark:text-dark-primary recompensa:bg-recompensa-background recompensa:text-recompensa-primary">
    Perfil
</h1>

<Modal bind:open={deleteModal} size="md" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6">
        <h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white recompensa:text-white">
            Eliminar Reserva
        </h3>
        <p>Vas tu reserva:</p>
        <Label class="space-y-2">
            <span>NIA:</span>
            <Input
                type="text"
                id="nia"
                name="nia"
                value={currentReserva["nia"]}
                readonly
                required />
        </Label>
        <Label class="space-y-2">
            <span>Puesto</span>
            <Input
                type="text"
                id="puesto"
                name="puesto"
                value={currentReserva["puesto"]}
                readonly
                required />
        </Label>
        <Label class="space-y-2">
            <span>Fecha</span>
            <Input
                type="text"
                id="fecha"
                name="fecha"
                value={currentReserva["fecha"]}
                readonly
                required />
        </Label>
        <Label class="space-y-2">
            <span>Franja Horaria</span>
            <Input
                type="text"
                id="hora"
                name="hora"
                value={currentReserva["hora"] + ":00 - " + (currentReserva["hora"] + 2) + ":00"}
                readonly
                required />
        </Label>
        <p class="font-bold text-xl text-center">Después de eliminarla, deberás reservar otra vez si quieres hacer uso del puesto</p>
        <Button
            type="submit"
            class="w-full1 bg-green-500 hover:bg-dele-accent dark:bg-dark-primary dark:hover:bg-dark-accent recompensa:bg-recompensa-primary hover:recompensa:bg-recompensa-accent"
            on:click={ev => {
                ev.preventDefault()
                deleteModal = false
                eliminar_reserva()
            }}>
            Eliminar Reserva
        </Button>
    </form>
</Modal>

<Tabs
    defaultClass="flex flex-coll space-x-2 rtl:space-x-reverse "
    tabStyle="underline"
    contentClass="p-4"
    class="px-8">
    <TabItem
        open
        title="Mis Taquillas"
        class=""
        activeClasses="sm:text-base text-xs p-4 text-dele-accent dark:text-dark-accent recompensa:text-recompensa-accent"
        inactiveClasses="text-gray-500 hover:text-dele-color p-4 dark:hover:text-dark-primary recompensa:text-recompensa-primary hover:recompensa:text-white sm:text-base text-xs">
        <div class="w-auto grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center mt-6">
            {#if reservas != null && reservas.length != 0}
                {#each reservas as reserva}
                    <Card class="mt-2 recompensa:bg-recompensa-primary recompensa:border-black">
                        <div class="flex place-content-between">
                            <h5
                                class="text-2xl font-medium underline text-dele-color dark:text-dark-primary recompensa:text-white">
                                {reserva["taquilla"]}
                            </h5>
                            {#if reserva["status"] === "reservada"}
                                <p class="text-center p-1 text-white bg-yellow-400 rounded">
                                    Reservada: {reserva["codigo"]}
                                </p>
                            {:else if reserva["status"] === "libre"}
                                <p class="text-center p-1 text-white bg-green-500 rounded">Libre</p>
                            {:else if reserva["status"] === "ocupada"}
                                <p class="text-center p-1 text-white bg-red-500 rounded">Ocupada</p>
                            {:else if reserva["status"] === "null"}
                                <p class="text-center p-1 text-white bg-black rounded">No existe</p>
                            {:else}
                                <p class="text-center p-1 text-white bg-black rounded">
                                    No disponible
                                </p>
                            {/if}
                        </div>
                        {#if reserva["status"] === "reservada" || reserva["status"] === "ocupada"}
                            <p
                                class="text-black text-sm mt-4 dark:text-white recompensa:text-white">
                                Reservada el {reserva["date"].split(" ")[0]} a las {reserva[
                                    "date"
                                ].split(" ")[1]}
                            </p>
                        {/if}
                    </Card>
                {/each}
            {:else}
                <p
                    class="text-4xl text-center text-dele-color mt-5 col-span-3 dark:text-white recompensa:text-white">
                    Todavía no has hecho ninguna reserva
                </p>
            {/if}
        </div>
    </TabItem>
    <TabItem
        title="Mis Puestos de Electrónica"
        class=""
        activeClasses="sm:text-base text-xs p-4 text-dele-accent dark:text-dark-accent recompensa:text-recompensa-accent"
        inactiveClasses="text-gray-500 hover:text-dele-color p-4 dark:hover:text-dark-primary recompensa:text-recompensa-primary hover:recompensa:text-white  sm:text-base text-xs">
        <div class="w-auto grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center mt-6">
            {#if osciloscopios != null && osciloscopios.length != 0}
                {#each osciloscopios as reserva}
                    <Card class="mt-2 recompensa:bg-recompensa-primary recompensa:border-black">
                        <div class="flex place-content-between">
                            <h5
                                class="text-2xl font-medium underline text-dele-color dark:text-dark-primary recompensa:text-white">
                                {reserva["fecha"]}
                                {reserva["hora"] + ":00 - " + (reserva["hora"] + 2) + ":00"}
                            </h5>
                            {#if reserva["estado"] === "reservada"}
                                <p class="text-center p-1 text-white bg-red-500 rounded">
                                    Reservado
                                </p>
                            {:else if reserva["estado"] === "completada"}
                                <p class="text-center p-1 text-white bg-black rounded">Completa</p>
                            {:else}
                                <p class="text-center p-1 text-white bg-black rounded">
                                    No disponible
                                </p>
                            {/if}
                        </div>
                        <p class="text-black text-sm mt-4 dark:text-white recompensa:text-white">
                            Puesto Reservado: {reserva["puesto"]}
                        </p>
                        <Button
                            class="mt-4 w-full bg-red-500 hover:bg-red-700"
                            on:click={() => openDeleteModal(reserva)}>
                            Eliminar Reserva
                        </Button>
                    </Card>
                {/each}
            {:else}
                <p
                    class="text-4xl text-center text-dele-color mt-5 col-span-3 dark:text-white recompensa:text-white">
                    Todavía no has hecho ninguna reserva
                </p>
            {/if}
        </div>
    </TabItem>
</Tabs>

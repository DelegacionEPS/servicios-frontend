<script lang="ts">
    import { AccordionItem, Accordion, Button, Popover, Alert } from "flowbite-svelte"
    import { goto } from "$app/navigation"
    import {
        AnnotationSolid,
        DrawSquareOutline,
        LockOpenOutline,
        UsersSolid,
        LockOutline,
        QuestionCircleSolid,
        UserCircleOutline,
        DrawSquareSolid
    } from "flowbite-svelte-icons"
    import { page } from "$app/stores"
    import Konami from "./Konami.svelte"
    import { signIn, signOut } from "@auth/sveltekit/client"

    // Get the session and authorized email lists from the page data
    $: session = $page.data.session
    $: authorizedEmailsEscuela = $page.data.authorizedEmailsLayoutEscuela
    $: authorizedEmailsDespacho = $page.data.authorizedEmailsLayoutDespacho

    let infoModal = false
    let copied = false

    const copy = async () => {
        try {
            await navigator.clipboard.writeText("delegeps@uc3m.es")
            copied = true
            setTimeout(() => {
                copied = false
            }, 2000)
        } catch (error) {
            console.error("Failed to copy text: ", error)
        }
    }

    // Derived values for easier conditionals in the markup
    $: userEmail = session?.user?.email
    $: isLoggedIn = Boolean(userEmail)
    $: isDespachoAuthorized = isLoggedIn && authorizedEmailsDespacho?.includes(userEmail)
    $: isEscuelaAuthorized = isLoggedIn && authorizedEmailsEscuela?.includes(userEmail)

    // Add a keyboard event handler for accessibility
    const handleKeyDown = (event: KeyboardEvent) => {
        // Trigger sign in when Enter or Space is pressed
        if (event.key === "Enter" || event.key === " ") {
            signIn("google")
        }
    }
</script>

<Konami />

<!-- Hero Section - Enhanced with gradient and animation -->
<div
    class="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 recompensa:from-green-500 recompensa:via-green-600 recompensa:to-green-700">
    <div class="container mx-auto px-4 py-20 md:py-12">
        <div class="text-center mb-14 animate-fadeIn">
            <h1
                class="text-5xl md:text-7xl font-bold mb-8 text-dele-color dark:text-white recompensa:text-white tracking-tight">
                Servicios de Delegación
            </h1>
            <p
                class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 recompensa:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Gestión de taquillas, puestos de electrónica y más servicios para estudiantes de la
                UC3M
            </p>
        </div>

        <div class="flex justify-center mb-6">
            <Button
                id="pop_home"
                class="rounded-full p-4 bg-white shadow-xl hover:shadow-2xl transition-all dark:bg-dark-primary recompensa:bg-recompensa-primary dark:text-white recompensa:text-white transform hover:scale-110">
                <QuestionCircleSolid
                    class="h-9 w-9 text-dele-color dark:text-white recompensa:text-white" />
            </Button>
        </div>
    </div>
</div>

<Popover
    class="text-black dark:text-white recompensa:text-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary md:w-1/3 sm:w-1/2 w-10/12 sm:text-md text-sm shadow-xl rounded-xl"
    title="Información"
    triggeredBy="#pop_home">
    <p
        class="dark:text-white recompensa:text-white text-sm sm:text-base text-justify leading-relaxed">
        Para poder reservar una <span
            class="underline hover:dark:text-dark-accent hover:recompensa:text-recompensa-accent hover:text-accent font-medium">
            <a href="/taquillas">taquilla</a>
        </span>
        , o un puesto de electrónica, necesitas
        <button
            type="button"
            on:click={() => signIn("google")}
            on:keydown={handleKeyDown}
            class="underline italic hover:dark:text-dark-accent hover:recompensa:text-recompensa-accent hover:text-accent font-medium">
            iniciar sesión
        </button>
        con tu cuenta de Google de la universidad.
        <br />
        <br />
        Si tienes algún problema, puedes contactar con nosotros en el despacho de delegación localizado
        en la sala 1.0.H01 (al lado del banco Santander) o escríbenos un correo a
        <button
            type="button"
            class="underline text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary hover:text-dele-accent hover:dark:text-dark-accent hover:recompensa:text-recompensa-accent cursor-pointer font-medium"
            on:click={copy}
            on:keydown={e => e.key === "Enter" && copy()}
            aria-label="Copy email address to clipboard">
            delegeps@uc3m.es
        </button>
        .
    </p>
</Popover>

<!-- Services Section - Improved cards with better visual hierarchy -->
<div class="container mx-auto px-4 py-16 md:py-24">
    <h2
        class="text-3xl md:text-4xl font-bold text-center mb-12 text-dele-color dark:text-white recompensa:text-white">
        Nuestros Servicios
    </h2>

    <Accordion class="max-w-4xl mx-auto mb-16 shadow-xl rounded-2xl overflow-hidden">
        {#if isLoggedIn}
            <AccordionItem
                class="text-white sm:text-2xl text-xl px-8 py-5 mb-3 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-300"
                activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent">
                <p slot="header" class="flex items-center gap-4 w-full font-medium">
                    <UserCircleOutline class="h-8 w-8" />
                    Mi Perfil
                </p>
                <div class="w-full flex justify-center p-6">
                    <button
                        class="text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-7 py-4 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        on:click={() => goto("./perfil")}>
                        Comprueba las taquillas que has reservado
                    </button>
                </div>
            </AccordionItem>
        {/if}

        <AccordionItem
            class="text-white sm:text-2xl text-xl px-8 py-5 mb-3 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-300"
            activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent">
            <p slot="header" class="flex items-center gap-4 w-full font-medium">
                <LockOpenOutline class="h-8 w-8" />
                Taquillas
            </p>
            <div class="grid sm:grid-cols-3 grid-cols-1 gap-5 p-6">
                <button
                    class="sm:col-span-2 text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-7 py-4 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    on:click={() => goto("./taquillas")}>
                    Reserva o comprueba el estado de una taquilla
                </button>
                <a
                    href="#Taquillas"
                    class="flex items-center justify-center text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-7 py-4 rounded-xl hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Más info...
                </a>
            </div>
        </AccordionItem>

        {#if isDespachoAuthorized}
            <AccordionItem
                class="text-white sm:text-2xl text-xl px-8 py-5 mb-3 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-300"
                activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent">
                <p slot="header" class="flex items-center gap-4 w-full font-medium">
                    <LockOutline class="h-8 w-8" />
                    Gestión de Taquillas
                </p>
                <div class="w-full flex justify-center p-6">
                    <button
                        class="text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-7 py-4 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        on:click={() => goto("./gestion_taquillas")}>
                        Administra y consulta las reservas de las taquillas
                    </button>
                </div>
            </AccordionItem>
        {/if}

        <AccordionItem
            class="text-white sm:text-2xl text-xl px-8 py-5 mb-3 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-300"
            activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent">
            <p slot="header" class="flex items-center gap-4 w-full font-medium">
                <DrawSquareOutline class="h-8 w-8" />
                Puestos de Electrónica
            </p>
            <div class="grid sm:grid-cols-3 grid-cols-1 gap-5 p-6">
                <button
                    class="sm:col-span-2 text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-7 py-4 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    on:click={() => goto("./osciloscopio")}>
                    Reserva un puesto de electrónica en el despacho
                </button>
                <a
                    href="#Osciloscopios"
                    class="flex items-center justify-center text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-7 py-4 rounded-xl hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Más info...
                </a>
            </div>
        </AccordionItem>

        {#if isDespachoAuthorized}
            <AccordionItem
                class="text-white sm:text-2xl text-xl px-8 py-5 mb-3 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-300"
                activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent">
                <p slot="header" class="flex items-center gap-4 w-full font-medium">
                    <DrawSquareSolid class="h-8 w-8" />
                    Gestión de Puestos
                </p>
                <div class="w-full flex justify-center p-6">
                    <button
                        class="text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-7 py-4 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        on:click={() => goto("./gestion_osciloscopios")}>
                        Administra y consulta las reservas de los puestos de electrónica
                    </button>
                </div>
            </AccordionItem>
        {/if}

        {#if isEscuelaAuthorized}
            <AccordionItem
                class="text-white sm:text-2xl text-xl px-8 py-5 mb-3 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-300"
                activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent">
                <p slot="header" class="flex items-center gap-4 w-full font-medium">
                    <UsersSolid class="h-8 w-8" />
                    Administrador
                </p>
                <div class="w-full flex justify-center p-6">
                    <button
                        class="text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-7 py-4 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        on:click={() => goto("./admin")}>
                        Administra los roles y la base de datos
                    </button>
                </div>
            </AccordionItem>
        {/if}

        <AccordionItem
            class="text-white sm:text-2xl text-xl px-8 py-5 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-300"
            activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent">
            <p slot="header" class="flex items-center gap-4 w-full font-medium">
                <AnnotationSolid class="h-8 w-8" />
                Encuestas 1ºC 24/25
            </p>
            <div class="grid sm:grid-cols-3 grid-cols-1 gap-5 p-6">
                <button
                    class="sm:col-span-2 text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-7 py-4 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    on:click={() => goto("./encuestas")}>
                    Consulta el índice de participación de las encuestas
                </button>
                <a
                    href="#Encuestas"
                    class="flex items-center justify-center text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-7 py-4 rounded-xl hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Más info...
                </a>
            </div>
        </AccordionItem>
    </Accordion>
</div>

<!-- Info Sections - Enhanced with better styling and animations -->
<section
    id="Taquillas"
    class="py-20 bg-gradient-to-br from-purple-200 via-pink-200 to-red-200 dark:from-purple-900 dark:via-pink-900 dark:to-red-900 recompensa:from-teal-500 recompensa:via-teal-600 recompensa:to-teal-700">
    <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div class="lg:w-1/2 w-full">
                <div
                    class="bg-white dark:bg-dark-background recompensa:bg-recompensa-background rounded-3xl shadow-2xl p-10 transform hover:scale-105 transition-transform duration-300 border-4 dark:border-dark-primary recompensa:border-recompensa-primary">
                    <h2
                        class="text-3xl font-bold mb-6 text-dele-color dark:text-white recompensa:text-white">
                        Servicio de Taquillas
                    </h2>
                    <p
                        class="text-gray-700 dark:text-gray-200 recompensa:text-gray-200 text-lg leading-relaxed">
                        La delegación de estudiantes gestiona las taquillas de la universidad. Si
                        quieres alquilar una, simplemente tendrás que elegir la que quieres y luego
                        rellenar un
                        <span
                            class="underline hover:dark:text-dark-accent hover:recompensa:text-recompensa-accent hover:text-accent font-medium">
                            <a href="/taquillas">formulario para reservarla.</a>
                        </span>
                        <br />
                        <br />
                        Para poder reservar, primero debes escoger el edificio y la planta. Tras ello,
                        deberás seleccionar un bloque para escoger la taquilla que quieras reservar.
                    </p>
                </div>
            </div>
            <div class="lg:w-1/3 w-full">
                <button
                    class="w-full text-white text-xl px-10 py-8 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-2xl flex items-center gap-5 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-white border-opacity-30"
                    on:click={() => {
                        goto("./taquillas")
                    }}>
                    <LockOpenOutline class="h-10 w-10" />
                    <p class="text-left text-2xl font-semibold">Taquillas</p>
                </button>
            </div>
        </div>
    </div>
</section>

<section
    id="Osciloscopios"
    class="py-20 bg-gradient-to-br from-indigo-200 via-blue-200 to-green-200 dark:from-indigo-900 dark:via-blue-900 dark:to-green-900 recompensa:from-orange-500 recompensa:via-orange-600 recompensa:to-orange-700">
    <div class="container mx-auto px-6">
        <div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
            <div class="lg:w-1/3 w-full">
                <button
                    class="w-full text-white text-xl px-10 py-8 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-2xl flex items-center gap-5 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-white border-opacity-30"
                    on:click={() => {
                        goto("./osciloscopio")
                    }}>
                    <DrawSquareOutline class="h-10 w-10" />
                    <p class="text-left text-2xl font-semibold">Puestos de Electrónica</p>
                </button>
            </div>
            <div class="lg:w-1/2 w-full">
                <div
                    class="bg-white dark:bg-dark-background recompensa:bg-recompensa-background rounded-3xl shadow-2xl p-10 transform hover:scale-105 transition-transform duration-300 border-4 dark:border-dark-primary recompensa:border-recompensa-primary">
                    <h2
                        class="text-3xl font-bold mb-6 text-dele-color dark:text-white recompensa:text-white">
                        Puestos de Electrónica
                    </h2>
                    <p
                        class="text-gray-700 dark:text-gray-200 recompensa:text-gray-200 text-lg leading-relaxed">
                        El despacho de delegación cuenta con tres puestos de electrónica que los
                        estudiantes pueden usar y prestamos un servicio de reserva. Para dar
                        servicio a la máxima cantidad posible de estudiantes, sólo se podrá reservar
                        una franja de 2 horas por semana.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<section
    id="Encuestas"
    class="py-20 bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 dark:from-yellow-900 dark:via-orange-900 dark:to-red-900 recompensa:from-purple-500 recompensa:via-purple-600 recompensa:to-purple-700">
    <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div class="lg:w-1/2 w-full">
                <div
                    class="bg-white dark:bg-dark-background recompensa:bg-recompensa-background rounded-3xl shadow-2xl p-10 transform hover:scale-105 transition-transform duration-300 border-4 dark:border-dark-primary recompensa:border-recompensa-primary">
                    <h2
                        class="text-3xl font-bold mb-6 text-dele-color dark:text-white recompensa:text-white">
                        Encuestas de Evaluación
                    </h2>
                    <p
                        class="text-gray-700 dark:text-gray-200 recompensa:text-gray-200 text-lg leading-relaxed">
                        Si quieres saber el porcentaje de participación por grado en las encuestas
                        de evaluación del profesorado, haz click en el siguiente botón. Actualmente,
                        se muestran las encuestas del primer cuatrimeste del curso 2024/2025.
                        <br />
                        <br />
                        Es muy importante participar en las encuestas, ya que con los resultados, podemos
                        centrar los esfuerzos en las asignaturas que más lo necesitan.
                    </p>
                </div>
            </div>
            <div class="lg:w-1/3 w-full">
                <button
                    class="w-full text-white text-xl px-10 py-8 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-2xl flex items-center gap-5 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-white border-opacity-30"
                    on:click={() => {
                        goto("./encuestas")
                    }}>
                    <AnnotationSolid class="h-10 w-10" />
                    <p class="text-left text-2xl font-semibold">Ver las encuestas</p>
                </button>
            </div>
        </div>
    </div>
</section>

<!-- Privacy Policy Section - Improved layout and design -->
<section class="py-24 bg-gray-50 dark:bg-dark-background recompensa:bg-recompensa-background">
    <div class="container mx-auto px-6">
        <h2
            class="text-3xl md:text-5xl font-bold text-center mb-16 text-dele-color dark:text-white recompensa:text-white tracking-tight">
            INFORMACIÓN BÁSICA SOBRE PROTECCIÓN DE DATOS
        </h2>

        <div class="grid md:grid-cols-3 grid-cols-1 gap-10 max-w-5xl mx-auto">
            <div
                class="bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100 dark:border-gray-800 recompensa:border-gray-800">
                <h3
                    class="text-2xl font-semibold mb-4 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
                    RESPONSABLE DEL TRATAMIENTO
                </h3>
                <p class="text-gray-700 dark:text-white recompensa:text-white text-lg">
                    Universidad Carlos III de Madrid
                </p>
            </div>

            <div
                class="bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100 dark:border-gray-800 recompensa:border-gray-800">
                <h3
                    class="text-2xl font-semibold mb-4 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
                    IDENTIFICACIÓN DEL TRATAMIENTO
                </h3>
                <p class="text-gray-700 dark:text-white recompensa:text-white text-lg">
                    Gestión de taquillas EPS
                </p>
            </div>

            <div
                class="bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100 dark:border-gray-800 recompensa:border-gray-800">
                <h3
                    class="text-2xl font-semibold mb-4 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
                    FINALIDAD
                </h3>
                <p class="text-gray-700 dark:text-white recompensa:text-white text-lg">
                    Gestión del uso de las taquillas por los estudiantes y empleados de la
                    universidad
                </p>
            </div>

            <div
                class="bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all md:col-span-2 transform hover:scale-105 border border-gray-100 dark:border-gray-800 recompensa:border-gray-800">
                <h3
                    class="text-2xl font-semibold mb-4 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
                    EJERCICIO DE DERECHOS
                </h3>
                <p class="text-gray-700 dark:text-white recompensa:text-white text-lg">
                    Podrá ejercer sus derechos de acceso, rectificación, supresión, limitación,
                    portabilidad y oposición a su tratamiento, mediante el envío de un correo a la
                    siguiente dirección: dpd@uc3m.es
                </p>
            </div>

            <div
                class="bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100 dark:border-gray-800 recompensa:border-gray-800">
                <h3
                    class="text-2xl font-semibold mb-4 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary">
                    INFORMACIÓN ADICIONAL
                </h3>
                <p class="text-gray-700 dark:text-white recompensa:text-white text-lg">
                    Puede consultar la información adicional y detallada sobre nuestra Política de
                    Privacidad
                    <a
                        href="https://www.uc3m.es/protecciondedatos"
                        class="underline text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary hover:text-dele-accent hover:dark:text-dark-accent hover:recompensa:text-recompensa-accent font-medium">
                        aquí
                    </a>
                    .
                </p>
            </div>
        </div>
    </div>
</section>

<style>
    /* Add animation for fade-in effect */
    .animate-fadeIn {
        animation: fadeIn 0.8s ease-in;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>

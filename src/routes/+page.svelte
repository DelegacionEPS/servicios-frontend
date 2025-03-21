<script lang="ts">
	import { AccordionItem, Accordion, Button, Popover, Alert } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import {
		AnnotationSolid,
		DrawSquareOutline,
		LockOpenOutline,
		UsersSolid,
		LockOutline,
		QuestionCircleSolid,
		UserCircleOutline,
		DrawSquareSolid
	} from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import Konami from './Konami.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';

	$: session = $page.data.session;
	$: authorizedEmailsEscuela = $page.data.authorizedEmailsLayoutEscuela;
	$: authorizedEmailsDespacho = $page.data.authorizedEmailsLayoutDespacho;
	let infoModal = false;
	$: copied = false;

	const copy = () => {
		navigator.clipboard.writeText('delegeps@uc3m.es');
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	};
</script>

<Konami />

<!-- Hero Section -->
<div
	class="bg-gradient-to-b from-white to-gray-100 dark:from-dark-background dark:to-dark-secondary recompensa:from-recompensa-background recompensa:to-recompensa-secondary"
>
	<div class="container mx-auto px-4 py-16 md:py-24">
		<div class="text-center mb-12">
			<h1
				class="text-4xl md:text-6xl font-bold mb-6 text-dele-color dark:text-white recompensa:text-white"
			>
				Servicios de Delegación
			</h1>
			<p
				class="text-lg md:text-xl text-gray-600 dark:text-gray-300 recompensa:text-gray-300 max-w-2xl mx-auto"
			>
				Gestión de taquillas, puestos de electrónica y más servicios para estudiantes de la UC3M
			</p>
		</div>

		<div class="flex justify-center mb-8">
			<Button
				id="pop_home"
				class="rounded-full p-3 bg-white shadow-md hover:shadow-lg transition-all dark:bg-dark-primary recompensa:bg-recompensa-primary dark:text-white recompensa:text-white"
			>
				<QuestionCircleSolid
					class="h-8 w-8 text-dele-color dark:text-white recompensa:text-white"
				/>
			</Button>
		</div>
	</div>
</div>

<Popover
	class="text-black dark:text-white recompensa:text-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary md:w-1/3 sm:w-1/2 w-10/12 sm:text-md text-sm shadow-xl rounded-xl"
	title="Información"
	triggeredBy="#pop_home"
>
	<p
		class="dark:text-white recompensa:text-white text-sm sm:text-base text-justify leading-relaxed"
	>
		Para poder reservar una <span
			class="underline hover:dark:text-dark-accent hover:recompensa:text-recompensa-accent hover:text-accent font-medium"
			><a href="/taquillas">taquilla</a></span
		>, o un puesto de electrónica, necesitas
		<button
			on:click={() => {
				signIn('google');
			}}
		>
			<span
				class="underline italic hover:dark:text-dark-accent hover:recompensa:text-recompensa-accent hover:text-accent font-medium"
				>iniciar sesión
			</span>
		</button>
		con tu cuenta de Google de la universidad. <br /><br />
		Si tienes algún problema, puedes contactar con nosotros en el despacho de delegación localizado en
		la sala 1.0.H01 (al lado del banco Santander) o escríbenos un correo a

		<a
			class="underline text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary hover:text-dele-accent hover:dark:text-dark-accent hover:recompensa:text-recompensa-accent cursor-pointer font-medium"
			on:click={copy}
		>
			delegeps@uc3m.es
		</a>.
	</p>
</Popover>

<!-- Services Section -->
<div class="container mx-auto px-4 py-12 md:py-16">
	<Accordion class="max-w-3xl mx-auto mb-16 shadow-lg rounded-xl overflow-hidden">
		{#await session then}
			{#if session?.user?.email != null}
				<AccordionItem
					class="text-white sm:text-2xl text-xl px-6 py-4 mb-2 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-200"
					activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent"
				>
					<p slot="header" class="flex items-center gap-3 w-full">
						<UserCircleOutline class="h-7 w-7" />
						Perfil
					</p>
					<div class="w-full flex justify-center p-4">
						<button
							class="text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-6 py-3 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-md hover:shadow-lg"
							on:click={() => {
								goto('./perfil');
							}}
						>
							Comprueba las taquillas que has reservado
						</button>
					</div>
				</AccordionItem>
			{/if}
		{/await}
		<AccordionItem
			class="text-white sm:text-2xl text-xl px-6 py-4 mb-2 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-200"
			activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent"
		>
			<p slot="header" class="flex items-center gap-3 w-full">
				<LockOpenOutline class="h-7 w-7" />
				Taquillas
			</p>

			<div class="grid sm:grid-cols-3 grid-cols-1 gap-4 p-4">
				<button
					class="sm:col-span-2 text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-6 py-3 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-md hover:shadow-lg"
					on:click={() => {
						goto('./taquillas');
					}}
				>
					Reserva o comprueba el estado de una taquilla
				</button>
				<a
					href="#Taquillas"
					class="flex items-center justify-center text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-6 py-3 rounded-xl hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-md hover:shadow-lg"
				>
					Más info...
				</a>
			</div>
		</AccordionItem>
		{#await authorizedEmailsDespacho then}
			{#await session then}
				{#if session?.user?.email != null}
					{#if authorizedEmailsDespacho != null && authorizedEmailsDespacho.includes(session?.user?.email) == true}
						<AccordionItem
							class="text-white sm:text-2xl text-xl px-6 py-4 mb-2 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-200"
							activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent"
						>
							<p slot="header" class="flex items-center gap-3 w-full">
								<LockOutline class="h-7 w-7" />
								Gestión de Taquillas
							</p>
							<div class="w-full flex justify-center p-4">
								<button
									class="text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-6 py-3 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-md hover:shadow-lg"
									on:click={() => {
										goto('./gestion_taquillas');
									}}
								>
									Administra y consulta las reservas de las taquillas
								</button>
							</div>
						</AccordionItem>
					{/if}
				{/if}
			{/await}
		{/await}
		<AccordionItem
			class="text-white sm:text-2xl text-xl px-6 py-4 mb-2 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-200"
			activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent"
		>
			<p slot="header" class="flex items-center gap-3 w-full">
				<DrawSquareOutline class="h-7 w-7" />
				Puestos de Electrónica
			</p>
			<div class="grid sm:grid-cols-3 grid-cols-1 gap-4 p-4">
				<button
					class="sm:col-span-2 text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-6 py-3 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-md hover:shadow-lg"
					on:click={() => {
						goto('./osciloscopio');
					}}
				>
					Reserva un puesto de electrónica en el despacho
				</button>
				<a
					href="#Osciloscopios"
					class="flex items-center justify-center text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-6 py-3 rounded-xl hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-md hover:shadow-lg"
				>
					Más info...
				</a>
			</div>
		</AccordionItem>
		{#await authorizedEmailsDespacho then}
			{#await session then}
				{#if session?.user?.email != null}
					{#if authorizedEmailsDespacho != null && authorizedEmailsDespacho.includes(session?.user?.email) == true}
						<AccordionItem
							class="text-white sm:text-2xl text-xl px-6 py-4 mb-2 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-200"
							activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent"
						>
							<p slot="header" class="flex items-center gap-3 w-full">
								<DrawSquareSolid class="h-7 w-7" />
								Gestión de Puestos
							</p>
							<div class="w-full flex justify-center p-4">
								<button
									class="text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-6 py-3 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-md hover:shadow-lg"
									on:click={() => {
										goto('./gestion_osciloscopios');
									}}
								>
									Administra y consulta las reservas de los puestos de electrónica
								</button>
							</div>
						</AccordionItem>
					{/if}
				{/if}
			{/await}
		{/await}
		{#await authorizedEmailsEscuela then}
			{#await session then}
				{#if session?.user?.email != null}
					{#if authorizedEmailsEscuela != null && authorizedEmailsEscuela.includes(session?.user?.email) == true}
						<AccordionItem
							class="text-white sm:text-2xl text-xl px-6 py-4 mb-2 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-200"
							activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent"
						>
							<p slot="header" class="flex items-center gap-3 w-full">
								<UsersSolid class="h-7 w-7" />
								Administrador
							</p>
							<div class="w-full flex justify-center p-4">
								<button
									class="text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-6 py-3 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-md hover:shadow-lg"
									on:click={() => {
										goto('./admin');
									}}
								>
									Administra los roles y la base de datos
								</button>
							</div>
						</AccordionItem>
					{/if}
				{/if}
			{/await}
		{/await}
		<AccordionItem
			class="text-white sm:text-2xl text-xl px-6 py-4 bg-dele-color hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent rounded-xl dark:text-white recompensa:text-white dark:border-black recompensa:border-black dark:bg-dark-primary recompensa:bg-recompensa-primary transition-all duration-200"
			activeClass="bg-dele-accent dark:bg-dark-accent recompensa:bg-recompensa-accent"
		>
			<p slot="header" class="flex items-center gap-3 w-full">
				<AnnotationSolid class="h-7 w-7" />
				Encuestas 1ºC 24/25
			</p>
			<div class="grid sm:grid-cols-3 grid-cols-1 gap-4 p-4">
				<button
					class="sm:col-span-2 text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-6 py-3 rounded-xl cursor-pointer hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-md hover:shadow-lg"
					on:click={() => {
						goto('./encuestas');
					}}
				>
					Consulta el índice de participación de las encuestas
				</button>
				<a
					href="#Encuestas"
					class="flex items-center justify-center text-base text-white dark:text-white recompensa:text-white bg-dele-color dark:bg-dark-primary recompensa:bg-recompensa-primary px-6 py-3 rounded-xl hover:bg-dele-accent hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-md hover:shadow-lg"
				>
					Más info...
				</a>
			</div>
		</AccordionItem>
	</Accordion>
</div>

<!-- Info Sections -->
<section
	id="Taquillas"
	class="py-16 bg-dele-color dark:bg-dark-secondary recompensa:bg-recompensa-secondary"
>
	<div class="container mx-auto px-4">
		<div class="flex flex-col lg:flex-row items-center justify-between gap-12">
			<div class="lg:w-1/2 w-full">
				<div
					class="bg-white dark:bg-dark-background recompensa:bg-recompensa-background rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 border-4 dark:border-dark-primary recompensa:border-recompensa-primary"
				>
					<h2 class="text-2xl font-bold mb-4 text-dele-color dark:text-white recompensa:text-white">
						Servicio de Taquillas
					</h2>
					<p
						class="text-gray-700 dark:text-gray-200 recompensa:text-gray-200 text-lg leading-relaxed"
					>
						La delegación de estudiantes gestiona las taquillas de la universidad. Si quieres
						alquilar una, simplemente tendrás que elegir la que quieres y luego rellenar un
						formulario para reservarla.
						<br /><br />
						Para poder reservar, primero debes escoger el edificio y la planta. Tras ello, deberás seleccionar
						un bloque para escoger la taquilla que quieras reservar.
					</p>
				</div>
			</div>
			<div class="lg:w-1/3 w-full">
				<button
					class="w-full text-white text-xl px-8 py-6 bg-dele-accent hover:bg-dele-accent-hove rounded-xl flex items-center gap-4 dark:bg-dark-primary recompensa:bg-recompensa-primary hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
					on:click={() => {
						goto('./taquillas');
					}}
				>
					<LockOpenOutline class="h-8 w-8" />
					<p class="text-left text-2xl">Taquillas</p>
				</button>
			</div>
		</div>
	</div>
</section>

<section
	id="Osciloscopios"
	class="py-16 bg-white dark:bg-dark-background recompensa:bg-recompensa-background"
>
	<div class="container mx-auto px-4">
		<div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
			<div class="lg:w-1/3 w-full">
				<button
					class="w-full text-white text-xl px-8 py-6 bg-dele-accent hover:bg-dele-accent-hove rounded-xl flex items-center gap-4 dark:bg-dark-primary recompensa:bg-recompensa-primary hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
					on:click={() => {
						goto('./osciloscopio');
					}}
				>
					<DrawSquareOutline class="h-8 w-8" />
					<p class="text-left text-2xl">Puestos de Electrónica</p>
				</button>
			</div>
			<div class="lg:w-1/2 w-full">
				<div
					class="bg-dele-color dark:bg-dark-secondary recompensa:bg-recompensa-secondary rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 text-white border-4 dark:border-dark-primary recompensa:border-recompensa-primary"
				>
					<h2 class="text-2xl font-bold mb-4">Puestos de Electrónica</h2>
					<p class="text-gray-100 text-lg leading-relaxed">
						El despacho de delegación cuenta con tres puestos de electrónica que los estudiantes
						pueden usar y prestamos un servicio de reserva. Para dar servicio a la máxima cantidad
						posible de estudiantes, sólo se podrá reservar una franja de 2 horas por semana.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section
	id="Encuestas"
	class="py-16 bg-dele-color dark:bg-dark-secondary recompensa:bg-recompensa-secondary"
>
	<div class="container mx-auto px-4">
		<div class="flex flex-col lg:flex-row items-center justify-between gap-12">
			<div class="lg:w-1/2 w-full">
				<div
					class="bg-white dark:bg-dark-background recompensa:bg-recompensa-background rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 border-4 dark:border-dark-primary recompensa:border-recompensa-primary"
				>
					<h2 class="text-2xl font-bold mb-4 text-dele-color dark:text-white recompensa:text-white">
						Encuestas de Evaluación
					</h2>
					<p
						class="text-gray-700 dark:text-gray-200 recompensa:text-gray-200 text-lg leading-relaxed"
					>
						Si quieres saber el porcentaje de participación por grado en las encuestas de evaluación
						del profesorado, haz click en el siguiente botón. Actualmente, se muestran las encuestas
						del primer cuatrimeste del curso 2024/2025.
						<br /><br />
						Es muy importante participar en las encuestas, ya que con los resultados, podemos centrar
						los esfuerzos en las asignaturas que más lo necesitan.
					</p>
				</div>
			</div>
			<div class="lg:w-1/3 w-full">
				<button
					class="w-full text-white text-xl px-8 py-6 bg-dele-accent hover:bg-dele-accent-hove rounded-xl flex items-center gap-4 dark:bg-dark-primary recompensa:bg-recompensa-primary hover:dark:bg-dark-accent hover:recompensa:bg-recompensa-accent transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
					on:click={() => {
						goto('./encuestas');
					}}
				>
					<AnnotationSolid class="h-8 w-8" />
					<p class="text-left text-2xl">Ver las encuestas</p>
				</button>
			</div>
		</div>
	</div>
</section>

<!-- Privacy Policy Section -->
<section class="py-16 bg-gray-50 dark:bg-dark-background recompensa:bg-recompensa-background">
	<div class="container mx-auto px-4">
		<h2
			class="text-3xl md:text-4xl font-bold text-center mb-12 text-dele-color dark:text-white recompensa:text-white"
		>
			INFORMACIÓN BÁSICA SOBRE PROTECCIÓN DE DATOS
		</h2>

		<div class="grid md:grid-cols-3 grid-cols-1 gap-8 max-w-5xl mx-auto">
			<div
				class="bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
			>
				<h3
					class="text-xl font-semibold mb-3 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary"
				>
					RESPONSABLE DEL TRATAMIENTO
				</h3>
				<p class="text-gray-700 dark:text-white recompensa:text-white">
					Universidad Carlos III de Madrid
				</p>
			</div>

			<div
				class="bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
			>
				<h3
					class="text-xl font-semibold mb-3 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary"
				>
					IDENTIFICACIÓN DEL TRATAMIENTO
				</h3>
				<p class="text-gray-700 dark:text-white recompensa:text-white">Gestión de taquillas EPS</p>
			</div>

			<div
				class="bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
			>
				<h3
					class="text-xl font-semibold mb-3 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary"
				>
					FINALIDAD
				</h3>
				<p class="text-gray-700 dark:text-white recompensa:text-white">
					Gestión del uso de las taquillas por los estudiantes y empleados de la universidad
				</p>
			</div>

			<div
				class="bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary p-6 rounded-xl shadow-md hover:shadow-lg transition-all md:col-span-2"
			>
				<h3
					class="text-xl font-semibold mb-3 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary"
				>
					EJERCICIO DE DERECHOS
				</h3>
				<p class="text-gray-700 dark:text-white recompensa:text-white">
					Podrá ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y
					oposición a su tratamiento, mediante el envío de un correo a la siguiente dirección:
					dpd@uc3m.es
				</p>
			</div>

			<div
				class="bg-white dark:bg-dark-secondary recompensa:bg-recompensa-secondary p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
			>
				<h3
					class="text-xl font-semibold mb-3 text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary"
				>
					INFORMACIÓN ADICIONAL
				</h3>
				<p class="text-gray-700 dark:text-white recompensa:text-white">
					Puede consultar la información adicional y detallada sobre nuestra Política de Privacidad
					<a
						href="https://www.uc3m.es/protecciondedatos"
						class="underline text-dele-color dark:text-dark-primary recompensa:text-recompensa-primary hover:text-dele-accent hover:dark:text-dark-accent hover:recompensa:text-recompensa-accent font-medium"
					>
						aquí
					</a>.
				</p>
			</div>
		</div>
	</div>
</section>

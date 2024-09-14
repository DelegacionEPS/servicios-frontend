<script lang="ts">
	/** @type {import('./$types').ActionData | any} */
	export let form: any;

	import { page } from '$app/stores';
	import { Tabs, TabItem, Input, Label, Button, Modal, Card } from 'flowbite-svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Dropdown,
		DropdownItem, 
		DropdownDivider, 
		DropdownHeader
	} from 'flowbite-svelte';
	let session = $page.data.session;

	// Reactive statement to update session whenever $page.data.session changes
	$: session = $page.data.session;

	let successToast = false;
	let unSuccessToast = false;
	let searchTerm = '';
	let deleteModal;
	let completeModal;
	let currentReserva;

	$: filteredItems = $page.data.tablaPabloOsciloscopios.filter((item) =>{
		return (item.status != "no_disponible" && item.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
	});

	$: notAvailableItems = $page.data.tablaPabloOsciloscopios.filter((item) => {
		return (item.status == "no_disponible" && item.taquilla.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
	})

	function change_delete_modal(reserva) {
		deleteModal = true;
		currentReserva = reserva;
	}

	async function eliminar_reserva() {
		// Call a function that only runs in the server side:
		let res_email = session?.user?.email || '';
		
		const response = await fetch('/api/eliminar_reserva_osciloscopio', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ puesto: currentReserva["puesto"], hora: currentReserva["hora"], fecha: currentReserva["fecha"], email: res_email })
		});

		let result = await response.json();
		result = result['result']['message'];
		if (result.includes('eliminada')) {
			successToast = true;
			setTimeout(() => {
				successToast = false;
				location.reload();
			}, 1000);
		} else {
			unSuccessToast = true;
		}
	}

	function change_complete_modal(reserva) {
		currentReserva = reserva;
		completeModal = true;
	}

	async function completar_reserva() {
		alert("Hola");
	}
</script>

<Modal bind:open={deleteModal} size="md" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6">
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Eliminar Reserva</h3>
		<p>Vas a eliminar una reserva con los siguientes datos:</p>
		<Label class="space-y-2">
			<span>NIA:</span>
			<Input type="text" id="nia" name="nia" value={currentReserva['nia']} readonly required />
		</Label>
		<Label class="space-y-2">
			<span>Puesto</span>
			<Input type="text" id="puesto" name="puesto" value={currentReserva['puesto']} readonly required/>
		</Label>
		<Label class="space-y-2">
			<span>Fecha</span>
			<Input type="text" id="fecha" name="fecha" value={currentReserva['fecha']} readonly required/>
		</Label>
		<Label class="space-y-2">
			<span>Franja Horaria</span>
			<Input type="text" id="hora" name="hora" value={(currentReserva['hora']) + ":00 - " + (currentReserva['hora'] + 2) + ":00"} readonly required/>
		</Label>
		<p class="font-bold text-xl text-center">Hazlo sólo en caso de error de la reserva</p>
		<Button
			type="submit"
			class="w-full1 bg-green-500 hover:bg-dele-accent dark:bg-dark-primary dark:hover:bg-dark-accent"
			on:click={(ev) => {
				ev.preventDefault();
				deleteModal = false;
				eliminar_reserva();
			}}>Eliminar Reserva</Button
		>
	</form>
</Modal>

<Modal bind:open={completeModal} size="md" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6">
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Eliminar Reserva</h3>
		<p>Vas a completar una reserva con los siguientes datos:</p>
		<Label class="space-y-2">
			<span>NIA:</span>
			<Input type="text" id="nia" name="nia" value={currentReserva['nia']} readonly required />
		</Label>
		<Label class="space-y-2">
			<span>Puesto</span>
			<Input type="text" id="puesto" name="puesto" value={currentReserva['puesto']} readonly required/>
		</Label>
		<Label class="space-y-2">
			<span>Fecha</span>
			<Input type="text" id="fecha" name="fecha" value={currentReserva['fecha']} readonly required/>
		</Label>
		<Label class="space-y-2">
			<span>Franja Horaria</span>
			<Input type="text" id="hora" name="hora" value={(currentReserva['hora']) + ":00 - " + (currentReserva['hora'] + 2) + ":00"} readonly required/>
		</Label>
		<Button
			type="submit"
			class="w-full1 bg-green-500 hover:bg-dele-accent dark:bg-dark-primary dark:hover:bg-dark-accent"
			on:click={(ev) => {
				ev.preventDefault();
				deleteModal = false;
				completar_reserva();
			}}>Completar Reserva</Button
		>
	</form>
</Modal>

<h1 class="text-4xl text-center text-dele-color m-5 dark:bg-dark-background dark:text-dark-primary">
	Gestión de Osciloscopios
</h1>
<Tabs tabStyle="underline" contentClass="p-4" class="px-8">
	<TabItem
		open
		title="Tabla Osciloscopios"
		class=""
		activeClasses="sm:text-base text-xs p-4 text-dele-accent dark:text-dark-accent"
		inactiveClasses="text-gray-500 hover:text-dele-color p-4 dark:hover:text-dark-primary sm:text-base text-xs"
		on:focus={() => {
			form = '';
		}}
	>
		<TableSearch placeholder="Busca por Nombre" hoverable={true} bind:inputValue={searchTerm}>
			<TableHead>
				<TableHeadCell>Nombre</TableHeadCell>
				<TableHeadCell>Nia</TableHeadCell>
				<TableHeadCell>Puesto</TableHeadCell>
				<TableHeadCell>Hora</TableHeadCell>
				<TableHeadCell>Fecha</TableHeadCell>
				<TableHeadCell>Estado</TableHeadCell>
				<TableHeadCell>Acciones</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#if filteredItems != null && filteredItems}
					{#each filteredItems as item}
						<TableBodyRow>
							<TableBodyCell>{item.nombre}</TableBodyCell>
							<TableBodyCell>{item.nia}</TableBodyCell>
							<TableBodyCell>{item.puesto}</TableBodyCell>
							<TableBodyCell>{item.hora}:00 - {item.hora + 2}:00</TableBodyCell>
							<TableBodyCell>{item.fecha}</TableBodyCell>
							<TableBodyCell>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</TableBodyCell>
							<TableBodyCell>
								<div class="grid grid-cols-1 xl:grid-cols-2">
									{#if item.status === "reservada"}
										
										<Button class="xl:w-[95%] w-full text-xs lg:text-md text-white bg-green-500 rounded p-1"
											on:click={() => {
												change_complete_modal(item);
											}}>
											Completar	
										</Button>
										<Button class="xl:w-[95%] w-full text-xs lg:text-md text-white bg-red-500 rounded p-1"
											on:click={() => {
												change_delete_modal(item);
											}}>
											Eliminar	
										</Button>
									{/if}
								</div>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/if}
			</TableBody>
		</TableSearch>
	</TabItem>
</Tabs>

{#if successToast}
	<div class="fixed bottom-0 right-0 m-5">
		<Card class="bg-green-500 dark:text-white text-white dark:bg-green-500">
			<p class="p-2">Acción realizada con éxito</p>
		</Card>
	</div>
{:else if unSuccessToast}
	<div class="fixed bottom-0 right-0 m-5">
		<Card class="bg-red-500 dark:text-white text-white dark:bg-red-500">
			<p class="p-2">La acción ha fallado</p>
		</Card>
	</div>
{/if}
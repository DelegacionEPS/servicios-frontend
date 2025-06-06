<script lang="ts">
	import { Button, Breadcrumb, BreadcrumbItem, Fileupload, Popover } from 'flowbite-svelte';
	import { afterUpdate, onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	// @ts-ignore
    import { CloudArrowUpSolid } from 'flowbite-svelte-icons';
    import { page } from '$app/stores';
    import * as XLSX from 'xlsx';

    $: session = $page.data.session;
    $: authorizedEmailsEscuela = $page.data.authorizedEmailsLayoutEscuela;

    $: names = $page.data.names;
	$: percentages = $page.data.percentages;
	$: UC3M_MAIL = $page.data.UC3M_MAIL;

    const modify_surveys_emails = ["100472310@alumnos.uc3m.es"];

	export function processData() {
		//fetchCSV().then((csv) => {
		const colors_array = Array(names.length).fill('#404040');

        console.log(names, percentages);
		colors_array[names.findIndex((name) => name.includes('ESCUELA'))] = '#3BC4A0';
		colors_array[names.findIndex((name) => name.includes('FCSJ'))] = '#FFBF1F';
		colors_array[names.findIndex((name) => name.includes('FHCD'))] = '#5599DD';

        // Customize colors
        colors_array[0] = "#ffc514"
        colors_array[1] = "#d2cdcd"
        colors_array[2] = "#d6772e"

        new Chart(document.getElementById("myChart"), {
            type: "bar",
            data: {
                labels: names,
                datasets: [
                    {
                        label: "% de votos",
                        data: percentages,
                        borderWidth: 1,
                        backgroundColor: colors_array
                    }
                ]
            },
            options: {
                indexAxis: "y",
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                    bar: {
                        borderWidth: 2
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                        position: "right",
                        labels: {
                            font: {
                                family: "Montserrat",
                                weight: "bold"
                            },
                            color: "black" // Set the color of legend labels here
                        }
                    },

                    title: {
                        display: false,
                        text: "Índice de participación por grado",
                        font: {
                            family: "Montserrat",
                            weight: "bold",
                            size: 20
                        }
                    }
                }
            }
        })

        Chart.defaults.font.family = "Montserrat"
    }

    /**
     * @type {any[]}
     */
    let breadcrumItems = []

    function generateBreadcrums() {
        const currentURL = window.location.href
        const urlSegments = currentURL.split("/").filter(segment => segment !== "")

        breadcrumItems = urlSegments.map(segment => {
            return {
                text: segment.charAt(0).toUpperCase() + segment.slice(1),
                href: `/${segment}`
            }
        })
        breadcrumItems.shift()
        breadcrumItems.shift()
    }

    let excelData: string[][] = [];
    let csvContent = '';
    let fileName = '';

    function handleChange(e) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        fileName = file.name;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            excelData = json as string[][];
            csvContent = XLSX.utils.sheet_to_csv(worksheet);
            uploadToServer();
        };

        reader.readAsArrayBuffer(file);
    };

    
    async function uploadToServer() {
        if (!csvContent || !fileName) return;
    
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const formData = new FormData();
        formData.append('file', blob, "Participacion.csv");
    
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
    
        if (res.ok) {
          location.reload();
        } else {
          alert('Error al subir el archivo');
        }
    };

	onMount(() => {
		processData();
		generateBreadcrums();
	});
</script>

<body class=" self-center">

    {#if modify_surveys_emails.includes(session?.user?.email) == true || authorizedEmailsEscuela.includes(session?.user?.email)}
        <label for="file" class="cursor-pointer md:w-11 md:h-11 h-13 w-13 rounded-3xl ml-[95vw] mt-4 border-dele-color border-2 dark:border-dark-primary recompensa:border-recompensa-accent">
            <CloudArrowUpSolid class="md:h-10 md:w-10 p-1 h-12 w-12 text-dele-color dark:text-dark-primary recompensa:text-recompensa-accent"/>
        </label>
        <input
            type="file"
            id="file"
            accept=".xlsx"
            class="hidden"
            on:change={handleChange}
        />
    {/if}


	<div class=" text-center">
		<h1 class=" text-black font-bold font-montserrat mt-4 dark:text-white recompensa:text-white">
			Realiza la encuesta de evaluación
			<a
				class="text-orange-500 font-bolder dark:text-dark-primary recompensa:text-recompensa-primary"
				href="https://aplicaciones.uc3m.es/encuestas/home/index">aquí</a
			>
		</h1>
	</div>

    <div>
        <canvas id="myChart"></canvas>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
</body>

<script lang="ts">
    import { tweened } from "svelte/motion"
    import { cubicOut } from "svelte/easing"

    export let percentage: number

    // Tweened value for smooth animation
    const progress = tweened(0, {
        duration: 1000,
        easing: cubicOut
    })

    // Update progress when percentage changes
    $: progress.set(percentage)

    // Determine color based on occupancy percentage
    $: color = getOccupancyColor(percentage)

    function getOccupancyColor(percentage: number) {
        if (percentage < 50) {
            return "var(--occupancy-low, rgb(72, 187, 120))"
        } else if (percentage < 80) {
            return "var(--occupancy-medium, rgb(237, 137, 54))"
        } else {
            return "var(--occupancy-high, rgb(245, 101, 101))"
        }
    }
</script>

<div
    class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 recompensa:bg-gray-600 overflow-hidden">
    <div
        class="h-2.5 rounded-full transition-all duration-300 ease-out"
        style="width: {$progress}%; background-color: {color}">
    </div>
</div>

<style>
    :global(:root) {
        --occupancy-low: rgb(72, 187, 120);
        --occupancy-medium: rgb(237, 137, 54);
        --occupancy-high: rgb(245, 101, 101);
    }

    :global(.recompensa) {
        --occupancy-low: rgb(104, 211, 145);
        --occupancy-medium: rgb(247, 171, 10);
        --occupancy-high: rgb(248, 113, 113);
    }
</style>

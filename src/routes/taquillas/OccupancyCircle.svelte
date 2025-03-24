<script lang="ts">
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    
    export let percentage: number;
    let size = 16; // Size in rem
    
    // Tweened value for smooth animation
    const progress = tweened(0, {
        duration: 1000,
        easing: cubicOut
    });
    
    // Update progress when percentage changes
    $: progress.set(percentage);
    
    // Calculate the stroke-dashoffset based on the progress
    $: dashOffset = 100 - $progress;
    
    // Determine color based on occupancy percentage
    $: color = getOccupancyColor(percentage);
    
    function getOccupancyColor(percentage: number) {
        if (percentage < 50) {
            return 'var(--occupancy-low, rgb(72, 187, 120))';
        } else if (percentage < 80) {
            return 'var(--occupancy-medium, rgb(237, 137, 54))';
        } else {
            return 'var(--occupancy-high, rgb(245, 101, 101))';
        }
    }
</script>

<div class="relative w-16 h-16">
    <!-- Background circle -->
    <svg class="w-full h-full" viewBox="0 0 36 36">
        <circle 
            cx="18" 
            cy="18" 
            r="16" 
            fill="none" 
            stroke-width="2" 
            class="stroke-gray-200 dark:stroke-gray-700 recompensa:stroke-gray-600"
        />
        
        <!-- Foreground circle with animation -->
        <circle 
            cx="18" 
            cy="18" 
            r="16" 
            fill="none" 
            stroke-width="3" 
            stroke-dasharray="100" 
            stroke-dashoffset={dashOffset} 
            stroke-linecap="round" 
            transform="rotate(-90 18 18)"
            style="stroke: {color};"
        />
    </svg>
    
    <!-- Percentage text in the middle -->
    <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-sm font-bold text-gray-700 dark:text-gray-300 recompensa:text-gray-200">
            {Math.round($progress)}%
        </span>
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
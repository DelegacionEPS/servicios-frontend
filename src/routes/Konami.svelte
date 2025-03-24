<script>
    import { goto } from "$app/navigation"

    /**
     * @type {number[]}
     */
    let combo = []
    let time = Date.now()

    // Konami code sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

    // Time limit in milliseconds for the combo to be valid
    const TIME_LIMIT = 3000

    /**
     * Checks if the entered key combination matches the Konami code
     * @param {KeyboardEvent} event - The keyboard event
     */
    function combinator(event) {
        const { keyCode } = event
        const now = Date.now()

        // Reset combo if the key isn't part of the sequence or too much time has passed
        if (!konamiSequence.includes(keyCode)) return
        if (now - time > TIME_LIMIT) combo = []

        combo.push(keyCode)
        time = now

        // Check if the combo matches the Konami code
        if (JSON.stringify(combo) === JSON.stringify(konamiSequence)) {
            goto("entrada-supersecretisima")
        }
    }
</script>

<!-- Capture keyboard events at the window level for the Konami code -->
<svelte:window on:keyup={combinator} />

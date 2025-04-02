/**
 * YouTube bulk unsubscribe function.
 * Wrapping this in an IIFE for browser compatibility.
 */

// Define and immediately invoke an asynchronous function expression (IIFE) for encapsulation
(async function iife() {

    // Set the delay time (in milliseconds) after which the "unsubscribe" button is clicked; adjust as needed
    var UNSUBSCRIBE_DELAY_TIME = 100
  
    /**
     * Delay runner function.
     * Wraps `setTimeout` so it can be `await`ed on.
     * @param {Function} fn - The function to execute after the delay.
     * @param {number} delay - The delay in milliseconds.
     */
    // Define an arrow function that returns a promise resolving after a delay
    var runAfterDelay = (fn, delay) => new Promise((resolve, reject) => {
  
      // Set a timeout to execute the provided function after the specified delay
      setTimeout(() => {
  
        // Execute the function passed as an argument
        fn()
  
        // Resolve the promise indicating that the delay has finished and function executed
        resolve()
  
      }, delay) // End of setTimeout with delay
    })
  
    // Retrieve all channel elements on the page by their tag name and convert the NodeList to an array
    var channels = Array.from(document.getElementsByTagName(`ytd-channel-renderer`))
  
    // Log the total number of channels found in the console for debugging purposes
    console.log(`${channels.length} channels found.`)
  
    // Initialize a counter to track the number of channels unsubscribed
    var ctr = 0
  
    // Loop through each channel element in the channels array
    for (const channel of channels) {
  
      // Within the channel element, find the unsubscribe button (identified by an aria-label starting with 'Unsubscribe from') and simulate a click
      channel.querySelector(`[aria-label^='Unsubscribe from']`).click()
  
      // Wait for a specified delay before continuing to allow the confirmation dialog to appear
      await runAfterDelay(() => {
  
        // Select the first confirmation dialog element that appears after clicking the unsubscribe button
        document.getElementsByTagName(`yt-confirm-dialog-renderer`)[0]
  
        // Within the confirmation dialog, find the confirm button (identified by an aria-label starting with 'Unsubscribe') and simulate a click
        .querySelector(`[aria-label^='Unsubscribe']`).click()
  
        // Log the progress of unsubscription in the console, indicating the current count out of the total channels
        console.log(`Unsubsribed ${ctr + 1}/${channels.length}`)
  
        // Increment the counter to reflect a successful unsubscription
        ctr++
  
      }, UNSUBSCRIBE_DELAY_TIME) // End of delay function call with the specified delay time
    } // End of loop over channels
  
  })() // End of IIFE and immediately invoke it
  

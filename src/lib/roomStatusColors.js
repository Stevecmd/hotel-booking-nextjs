/**
 * Get the status colors and text for a room based on its status and secondary status.
 *
 * @param {string} status - The primary status of the room. Possible values are "AVAILABLE", "OCCUPIED", "MAINTENANCE", "BOOKED", "CLEANING".
 * @param {string} [secondaryStatus] - The secondary status of the room. If the secondary status is "CLEANING", it will affect the returned values.
 * @returns {Object} An object containing the primary color, secondary color (if applicable), and text representation of the status.
 * @returns {string} return.primary - The primary color class for the room status.
 * @returns {string|null} return.secondary - The secondary color class for the room status, or null if not applicable.
 * @returns {string} return.text - The text representation of the room status.
 */
export function getStatusColors(status, secondaryStatus) {
    const primaryColor = {
        "AVAILABLE": "bg-green-500",
        "OCCUPIED": "bg-red-500",
        "MAINTENANCE": "bg-yellow-500",
        "BOOKED": "bg-purple-500",
        "CLEANING": "bg-blue-500"
    }[status] || "bg-gray-500";

    if (secondaryStatus === 'CLEANING') {
        return {
            primary: primaryColor,
            secondary: "bg-blue-500",
            text: `${status}${secondaryStatus === 'CLEANING' ? ' (Cleaning)' : ''}`
        };
    }

    return {
        primary: primaryColor,
        secondary: null,
        text: status
    };
}

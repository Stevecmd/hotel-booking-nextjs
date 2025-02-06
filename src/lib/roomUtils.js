/**
 * Completes the room cleaning process by sending a DELETE request to the server
 * to remove the cleaning status of the specified room. If the room's primary status
 * is 'CLEANING', it updates the status to 'AVAILABLE'.
 *
 * @param {string} roomId - The ID of the room to complete cleaning for.
 * @returns {Promise<Object>} The updated room data.
 * @throws {Error} If the request fails or an error occurs during the process.
 */
export const completeRoomCleaning = async (roomId) => {
    try {
        const result = await fetch(`/api/rooms/${roomId}/cleaning`, {
            method: 'DELETE',  // Using DELETE to remove cleaning status
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!result.ok) {
            throw new Error('Failed to complete room cleaning');
        }
        
        // Get the current room status
        const roomData = await result.json();
        
        // If the primary status is CLEANING, update it to AVAILABLE
        if (roomData.room.status === 'CLEANING') {
            await updateRoomStatus(roomId, null, 'AVAILABLE', 'NONE');
        }
        
        return roomData;
    } catch (error) {
        console.error('Error completing room cleaning:', error);
        throw error;
    }
};

/**
 * Starts the cleaning process for a specific room.
 *
 * @param {string} roomId - The ID of the room to be cleaned.
 * @returns {Promise<Object>} The response from the server as a JSON object.
 * @throws {Error} If the request fails or the server responds with a non-OK status.
 */
export const startRoomCleaning = async (roomId) => {
    try {
        const result = await fetch(`/api/rooms/${roomId}/cleaning`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!result.ok) {
            throw new Error('Failed to start room cleaning');
        }
        
        return await result.json();
    } catch (error) {
        console.error('Error starting room cleaning:', error);
        throw error;
    }
};

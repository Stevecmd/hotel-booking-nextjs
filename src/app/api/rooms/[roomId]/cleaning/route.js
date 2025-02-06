import { NextResponse } from 'next/server';
import connectMongoDB from "@/lib/mongodb";
import Room from '@/models/room';


/**
 * Handles the POST request to start cleaning a room.
 *
 * @param {Request} request - The incoming request object.
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.roomId - The ID of the room to start cleaning.
 * @returns {Promise<Response>} The response object containing the result of the operation.
 */
export async function POST(request, { params }) {
    try {
        await connectMongoDB();
        const { roomId } = params;

        // Get current room status
        const currentRoom = await Room.findById(roomId);
        if (!currentRoom) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        // Determine whether to use primary or secondary status
        const updateData = {};
        
        if (currentRoom.status === '') {
            // If room has no status, use primary status
            updateData.status = 'CLEANING';
        } else {
            // Otherwise use secondary status
            updateData.secondaryStatus = 'CLEANING';
        }

        const room = await Room.findByIdAndUpdate(roomId, updateData, { new: true });

        return NextResponse.json({ 
            message: 'Room cleaning started',
            room 
        });

    } catch (error) {
        console.error('Start cleaning error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * Handles the DELETE request to complete cleaning a room.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.roomId - The ID of the room to complete cleaning.
 * @returns {Promise<Response>} The response object containing the result of the operation.
 */
export async function DELETE(request, { params }) {
    try {
        await connectMongoDB();
        const { roomId } = params;

        // Get current room status
        const currentRoom = await Room.findById(roomId);
        if (!currentRoom) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        // Update based on which status is CLEANING
        const updateData = {
            secondaryStatus: 'NONE'
        };

        // If primary status is CLEANING, set it to AVAILABLE
        if (currentRoom.status === 'CLEANING') {
            updateData.status = 'AVAILABLE';
        }

        const room = await Room.findByIdAndUpdate(roomId, updateData, { new: true });

        return NextResponse.json({ 
            message: 'Room cleaning completed',
            room 
        });

    } catch (error) {
        console.error('End cleaning error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

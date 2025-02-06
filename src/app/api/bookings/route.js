import { NextResponse } from 'next/server';
import connectMongoDB from "@/lib/mongodb";
import Room from '@/models/room';
import Booking from '@/models/booking';

export async function POST(request) {
    try {
        await connectMongoDB();
        const body = await request.json();

        // Validate the room exists and is available
        const room = await Room.findById(body.roomId);
        if (!room) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }
        if (room.status !== 'AVAILABLE') {
            return NextResponse.json({ error: 'Room is not available' }, { status: 400 });
        }

        // Create booking
        const booking = await Booking.create({
            room: body.roomId,
            customer: body.customerId,
            checkInDate: body.checkInDate,
            checkOutDate: body.checkOutDate,
            totalCost: body.totalCost,
            guestDetails: {
                ...body.guestDetails,
                roomServiceRequests: body.guestDetails.roomServiceRequests?.map(request => ({
                    type: request,
                    status: 'pending',
                    requestedAt: new Date()
                })) || []
            },
            status: 'CONFIRMED',
            paymentStatus: body.paymentStatus || 'pending'
        });

        // Update room status and add activeBooking reference
        await Room.findByIdAndUpdate(body.roomId, { 
            status: 'BOOKED',
            activeBooking: booking._id,
            customer: {
                name: `${body.guestDetails.firstName} ${body.guestDetails.lastName}`,
                checkIn: body.checkInDate,
                checkOut: body.checkOutDate,
                specialRequests: body.guestDetails.specialRequests,
                roomServiceRequests: body.guestDetails.roomServiceRequests
            }
        });

        // Get updated room data
        const updatedRoom = await Room.findById(body.roomId).populate({
            path: 'activeBooking',
            populate: { path: 'customer' }
        });

        return NextResponse.json({ 
            message: 'Booking created successfully',
            booking,
            room: updatedRoom
        }, { status: 201 });

    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

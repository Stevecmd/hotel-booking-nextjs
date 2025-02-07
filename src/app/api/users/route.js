import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


/**
 * Handles the GET request to fetch all users from the database.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to a JSON response containing the users or an error message.
 *
 * @throws {Error} - If there is an error connecting to the database or fetching the users.
 */
export const GET = async (req) => {
    try {
        await connectMongoDB();
        const users = await User.find({}).select('-password -cardNumber -cvv');
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};


/**
 * Handles the OPTIONS HTTP request.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object with a status of 200.
 */
export const OPTIONS = async () => {
    return NextResponse.json({}, { status: 200 });
};

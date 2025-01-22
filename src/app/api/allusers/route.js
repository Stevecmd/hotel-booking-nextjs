import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

/**
 * Handles GET requests to fetch all users.
 * @returns {Promise<NextResponse>} A promise that resolves to the NextResponse object containing all users.
 */
export async function GET() {
	await connectMongoDB();
	const allusers = await User.find({});
	// console.log(allusers);
	return NextResponse.json(allusers);
}

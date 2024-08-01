import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'


export async function PATCH(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("test"); // Ensure the correct database is used

    // Extract phoneNumber from the request body
    const { phone } = await request.json();


    try {
        const result = await db.collection("users").updateOne(
            { email: session.user.email }, // Use email from session to identify the user
            { $set: { phone } }      // Update the phone field
        );

        // Check if a document was modified
        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: "User not found or phone number not changed" }, { status: 404 });
        }

        return NextResponse.json({ message: "Phone number updated successfully" });
    } catch (error) {
        console.error("Error updating phone number:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
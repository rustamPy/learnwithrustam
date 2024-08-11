import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function PATCH(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("test"); // Ensure the correct database is used

    // Extract fields to update from the request body
    const { worktitle, phone, courses, about, userStatus } = await request.json();


    // Build the update object dynamically
    const updateData = {};


    if (worktitle) updateData.worktitle = worktitle;
    if (phone) updateData.phone = phone;
    if (courses) updateData.courses = courses;
    if (about) updateData.about = about;
    if (userStatus) updateData.userStatus = userStatus;

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ error: "No valid fields provided for update" }, { status: 400 });
    }

    try {
        const result = await db.collection("users").updateOne(
            { email: session.user.email }, // Use email from session to identify the user
            { $set: updateData } // Use the dynamically built update object
        );

        // Check if a document was modified
        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: "User not found or data not changed" }, { status: 404 });
        }

        const currentUser = await db.collection("users").findOne({ email: session.user.email });

        // Check if the user is trying to change from 'student' to something else
        if (currentUser.userStatus === 'student' && userStatus && userStatus !== 'student') {
            return NextResponse.json({ error: "Unauthorized status change" }, { status: 403 });
        }

        return NextResponse.json({ message: "Data is updated successfully" });
    } catch (error) {
        console.error("Error updating data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

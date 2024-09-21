import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { authOptions } from '@/app/(pro)/api/auth/[...nextauth]/options';

export async function PATCH(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("test");

    const { worktitle, phone, courses, about, userStatus } = await request.json();
    const updateData = {};

    if (worktitle !== undefined) updateData.worktitle = worktitle;
    if (phone !== undefined) updateData.phone = phone;
    if (courses !== undefined) updateData.courses = courses;
    if (about !== undefined) updateData.about = about;
    if (userStatus !== undefined) updateData.userStatus = userStatus;

    try {
        const result = await db.collection("users").updateOne(
            { email: session.user.email },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
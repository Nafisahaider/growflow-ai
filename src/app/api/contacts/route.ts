import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { name, phone, tags } = await req.json()

    if (!name || !phone) {
      return NextResponse.json({ message: "Name and phone are required" }, { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        phone,
        tags: tags || "[]",
        userId: session.user.id
      }
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error("Failed to create contact", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

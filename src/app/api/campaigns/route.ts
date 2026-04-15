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

    const { name, message, status, audienceFilter } = await req.json()

    if (!name || !message) {
      return NextResponse.json({ message: "Name and message are required" }, { status: 400 })
    }

    // 1. Create the base campaign object
    const campaign = await prisma.campaign.create({
      data: {
        name,
        message,
        status,
        userId: session.user.id
      }
    })

    // If draft, just return it. 
    // If running, we simulate enqueueing by creating message records directly.
    if (status === "running") {
      let contacts = await prisma.contact.findMany({
        where: { userId: session.user.id }
      })

      // Filter logic
      if (audienceFilter !== "all" && audienceFilter.startsWith("tag:")) {
        const tag = audienceFilter.replace("tag:", "")
        contacts = contacts.filter(c => {
          try {
            const tags = JSON.parse(c.tags) as string[]
            return tags.includes(tag)
          } catch { return false }
        })
      }

      // Bulk create message objects (simulating queue pushing queueing)
      if (contacts.length > 0) {
        const messagesData = contacts.map(c => ({
          content: message.replace("{name}", c.name),
          status: "pending",
          contactId: c.id
        }))
        
        await prisma.message.createMany({
          data: messagesData
        })
        
        // We simulate that the background worker picked it up. We update campaign to completed after 1s logic (not exact, just changing state)
        setTimeout(async () => {
          await prisma.campaign.update({
            where: { id: campaign.id },
            data: { status: "completed" }
          })
        }, 3000)
      } else {
        await prisma.campaign.update({
          where: { id: campaign.id },
          data: { status: "completed" } // empty audience early exit
        })
      }
    }

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error("Failed to create campaign", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

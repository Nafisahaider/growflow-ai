import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { CampaignsClient } from "./client"
import { redirect } from "next/navigation"

export default async function CampaignsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect("/signin")
  }

  // Fetch campaigns and contacts for the client
  const campaigns = await prisma.campaign.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  })

  const contactsContext = await prisma.contact.findMany({
    where: { userId: session.user.id }
  })

  const contacts = contactsContext.map(c => ({
    id: c.id,
    tags: c.tags ? JSON.parse(c.tags) : []
  }))

  const serializedCampaigns = campaigns.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }))

  return <CampaignsClient initialCampaigns={serializedCampaigns} contacts={contacts} />
}

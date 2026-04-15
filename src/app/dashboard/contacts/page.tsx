import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { ContactsClient } from "./client"
import { redirect } from "next/navigation"

export default async function ContactsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect("/signin")
  }

  const contactsContext = await prisma.contact.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  })

  // Format tags string to array for the client
  const contacts = contactsContext.map(c => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    tags: c.tags ? JSON.parse(c.tags) : [],
    createdAt: c.createdAt.toISOString(),
  }))

  return <ContactsClient initialContacts={contacts} />
}

"use client"

import { Navbar } from "@/components/marketing/navbar"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect to test the waters",
    features: ["500 Contacts limit", "3 Campaigns / month", "No AI usage", "1 Team member"],
    cta: "Start Free",
    href: "/signup",
    popular: false,
  },
  {
    name: "Starter",
    price: "$49",
    billing: "/mo",
    description: "Great for small businesses",
    features: ["2,000 Contacts limit", "Unlimited Campaigns", "1,000 AI Credits", "3 Team members"],
    cta: "Start Free Trial",
    href: "/signup?plan=starter",
    popular: true,
  },
  {
    name: "Pro",
    price: "$149",
    billing: "/mo",
    description: "For scaling sales teams",
    features: ["10,000 Contacts limit", "Advanced AI Agents", "10,000 AI Credits", "10 Team members", "Priority Support"],
    cta: "Upgrade Plan",
    href: "/dashboard/billing", // Needs logged in check
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Unlimited scale and features",
    features: ["Unlimited Contacts", "Dedicated Account Manager", "Unlimited AI Credits", "SSO & Custom SLA"],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans">
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Scale your WhatsApp marketing without breaking the bank. Access all features on the free 14-day trial.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white border rounded-3xl p-8 flex flex-col ${
                plan.popular ? "border-emerald-500 shadow-2xl shadow-emerald-500/20" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-6 flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                {plan.billing && <span className="text-gray-500 ml-1">{plan.billing}</span>}
              </div>

              <ul className="space-y-4 flex-1 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mr-2 shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-center transition-colors ${
                  plan.popular
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

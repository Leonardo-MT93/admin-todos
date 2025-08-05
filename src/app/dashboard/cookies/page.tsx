import { Metadata } from "next";
import { TabBar } from "@/components/TabBar";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Cookies",
    description: "Cookies",
    icons: {
        icon: "/favicon.ico",
    },
}

export default async function Cookies() {

    const cookieStore = await cookies()
    const cookieTab = Number(cookieStore.get('selectedTab')?.value ?? '1')
    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-6">
            <div className="flex flex-col gap-4">
            <span className="text-3xl font-bold">Tabs</span>
            <TabBar currentTab={cookieTab} />
            </div>
        </div>
    )
}
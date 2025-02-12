// difference between template is that it only renders once on load
// template rerenders every time

import { Header } from "@/components/Header"

export default async function SpotLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="mx-auto w-full max-w-7xl min-h-svh">
            <Header />
            <div className="px-4 py-2">
                {children}
            </div>
        </div>
    )
}
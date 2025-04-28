import { poppins,exo } from "@/fonts"

export default function MarketPlacePage() {
    return (
        <section className="min-h-[90vh] flex flex-col justify-center items-center text-center">
            <h1 className={`${poppins.className} max-sm:text-[3em] text-[5em] font-[600] text-black`}>Marketplace</h1>
            <h2 className={`${exo.className} text-zinc-600 w-[70%] max-sm:text-[1em] text-[1.25em]`}>Soon.... Some kits (drums, loops) for our fans!</h2>
        </section>
    )
}
import { Exo, League_Spartan, Poppins, Roboto_Mono } from "next/font/google"

const leaguespartan = League_Spartan(
    { 
        subsets: ['latin'],
    }
)

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400","500", "600","800"]
})

const exo = Exo({
    subsets: ["latin"]
})

const roboto = Roboto_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
})

export {leaguespartan,poppins,exo,roboto}
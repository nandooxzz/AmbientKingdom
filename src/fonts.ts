import { Exo, League_Spartan, Poppins } from "next/font/google"

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

export {leaguespartan,poppins,exo}
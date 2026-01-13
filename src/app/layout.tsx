import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hamburguer from "@/components/hamburguer";
import { FaUser } from "react-icons/fa6";
import NextTopLoader from "nextjs-toploader"

import "./globals.css";
import {poppins, leaguespartan, roboto} from "@/fonts"
import { AuthProvider } from "@/components/authContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Ambient Kingdom",
  description: "Creators, soldiers and manteiners of Ambient Trap. Ambient Kingdom Website.",
  robots: "all",
  authors:[{name: "Ambient Kingdom", url:"https://www.instagram.com/ambient_kingdom_/"}],
  icons:["/ak-logo.jpg"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#a855f7"/>
        {/* <section className="absolute w-full min-h-full text-white select-none">
            <header className="sticky w-full bg-zinc-900 h-[80px] flex items-center justify-between z-50">
              <Link href={`/`}><h1 className={`relative left-10 ${leaguespartan.className} text-[1.5em] flex`}><FaCrown className="mr-2 mt-[1.5px]"/><span className="titleSpan">Ambient Kingdom</span></h1></Link>
              <div className={`menu relative flex justify-around ${poppins.className} right-10`}>
                <Link href={`/marketplace`} className="menuLink"><h3>Marketplace</h3></Link>
                <Link href={`/contact`} className="menuLink"><h3>Contact</h3></Link>
              </div>
            </header> */}
            
            {/* <footer className="relative w-full min-h-[150px] bg-zinc-900 top-full flex justify-around items-center">
              <div className="flex">
                <Link href={"https://discord.gg/JDAMM5bqVd"} target="_blank"><FaDiscord className="text-[3em] max-sm:text-[2em] m-3 hover:text-purple-500"/></Link>
                <Link href={"https://www.instagram.com/ambient_kingdom_/"} target="_blank"><FaInstagram className="text-[3em] max-sm:text-[2em] m-3 hover:text-purple-500"/></Link>
                <Link href={"https://open.spotify.com/playlist/5ggjTZJy8Xslwaotixt82V?si=3fcdccfdd69b47cc"} target="_blank"><FaSpotify className="text-[3em] max-sm:text-[2em] m-3 hover:text-purple-500"/></Link>
              </div>
              <Image src={`/whiteink.png`} width={150} height={100} alt="Ambient Kingdom's signature"/>
            </footer>
          </section> */}

        <section className={`relative w-full h-full ${roboto.className} flex justify-center items-center pt-[5vh] pr-[20vh] pl-[20vh] layoutContainer`}>
            <section className="w-full h-[80vh] ">
                <header className="w-full h-[10vh] flex justify-around items-center">
                    <Link href={"/"}><Image src={"/aa-black.png"} width={98.5} height={51.5} alt="logo"/></Link>
                    <div className="flex menu items-center">
                        <Link href={"/awards"}><p className="m-2 hover:text-purple-700">Awards 2025</p></Link>
                        <Link href={"/marketplace"}><p className="m-2 hover:text-purple-700">Marketplace</p></Link>
                        <Link href={"/news"}><p className="m-2 hover:text-purple-700">News</p></Link>
                        <Link href={"/contact"}><p className="m-2 hover:text-purple-700">Contact</p></Link>
                        {/* <Link href={"/login"}><p className="m-2 hover:text-purple-700"><FaUser/></p></Link> */}
                    </div>
                    <Hamburguer/>
                </header>
                <section>
                  <AuthProvider>
                    {children}
                  </AuthProvider>
                  <Toaster />
                </section>
            </section>
        </section>
      </body>
    </html>
  );
}

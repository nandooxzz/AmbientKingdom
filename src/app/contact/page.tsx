import { Button } from "@/components/ui/button"
import { poppins,exo } from "@/fonts"
import Image from "next/image"
import Link from "next/link"
import { FaInstagram, FaEnvelope, FaSpotify, FaYoutube } from "react-icons/fa6"

export default function ContactPage () {
    return (
        <section className="p-[100px] flex-col items-center min-h-[90vh]">
            <div className="flex justify-around items-center contactDiv">
                <div className="contactTextDiv">
                    <h1 className={`${poppins.className} text-zinc-900 text-[3em] font-[600]`}>Contact</h1>
                    <p className={`${exo.className} text-zinc-700 w-[60%]`}>
                        For artists who are interest in joining us, or, for requests and sugestions in general, contact 
                        us by e-mail or instagram! Links down below.
                        <br /><br />
                        Join our Discord community, interact with us, download & send loops, kits, etc!
                    </p>
                    <Link href={`https://discord.gg/JDAMM5bqVd`} target="_blank">
                        <Image src={"https://img.shields.io/badge/Discord-5865F2.svg?style=for-the-badge&logo=Discord&logoColor=white"} className={"rounded-md mt-2"} width={140} height={100} alt="discord bagde"/>
                    </Link>
                    <br />
                    <div>
                        <Link href={`https://open.spotify.com/playlist/5ggjTZJy8Xslwaotixt82V?si=3fcdccfdd69b47cc`} target="_blank"><Button className="contactButton"><FaSpotify/></Button></Link>
                        <Link href={`https://www.youtube.com/@ambient_kingdom`} target="_blank"><Button className="contactButton"><FaYoutube/></Button></Link>
                        <Link href={`https://www.instagram.com/ambient_kingdom_/`} target="_blank"><Button className="contactButton"><FaInstagram/></Button></Link>
                        <Link href={`mailto:ambientkingdom01@gmail.com`} target="_blank"><Button className="contactButton"><FaEnvelope/></Button></Link>
                    </div>
                </div>
                <div className="flex justify-center items-center border-purple-500 border-2 rounded-md p-2 contactImageDiv">
                    <Image src={"/ak-logo.jpg"} width={400} height={400} alt="Ambient Kingdom Logo" className="rounded-md"/>
                </div>
            </div>
            <br /><br /><br /><br />
            <div className="flex justify-center items-center flex-col">
                <h3 className={`${poppins.className} font-[400] text-black mb-3`}>© Founded in 2024</h3>
                <Image src={'/blackink.png'} width={200} height={100} alt="Ambient Kingdom's signature"/>
            </div>
        </section>
    )
}
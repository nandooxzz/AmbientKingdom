import { ScriptProps } from "next/script";
import Image from "next/image";
import Link from "next/link";

interface RadarProps {
    img: {url:string,height:number,width:number} | undefined,
    url: {spotify:string} | undefined
    artist: Array<{ external_urls: {spotify: string}, id: string, name: string }> | undefined
    title: string | undefined
    altText?: string | undefined
}

import { League_Spartan } from "next/font/google"
import { Poppins } from "next/font/google";

const leaguespartan = League_Spartan(
  { 
    subsets: ['latin'],
  }
)

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400"
})

export default function RadarHomePage({img,url,artist,title,altText}: RadarProps) {

    return (
        <div className={`p-[25px] bg-zinc-900 rounded-[15px] shadow-2xl`}>
            <h1 className={`${leaguespartan.className} uppercase text-center font-bold text-[1.5em] border-b-[1px]`}>Latest Track</h1><br />
            {(()=> {
              if (img?.url) {
                return <Image src={img?.url} height={300} width={300} alt={`${altText}`} className="rounded-[10px]"/>
              } else {
                return <Image src={`/ak-logo.jpg`} height={300} width={300} alt={`${altText}`} className="rounded-[10px]"/>
              }
            })()}
            <div className="flex justify-between mt-2 text-[1em]">
                <h1 className={`${leaguespartan.className} font-semibold`}>{title}</h1>
                <h2 className={`${poppins.className} text-purple-400 cursor-pointer`}>{artist?.map((a) => {
                    return artist.indexOf(a) == (artist.length - 1) ?
                    <Link href={a?.external_urls.spotify} target="_blank" key={a?.name} className="hover:text-purple-300">{a?.name}</Link>
                    :
                    <Link href={a?.external_urls.spotify} target="_blank" key={a?.name} className="hover:text-purple-300">{a?.name}, </Link>
                })}</h2>
            </div>

        </div>
    )
}
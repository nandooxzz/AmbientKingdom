import Image from "next/image";
import Link from "next/link";

interface RadarProps {
    img: {url:string,height:number,width:number} | undefined,
    external_url: string | undefined
    artist: Array<{ external_urls: {spotify: string}, id: string, name: string }> | undefined
    title: string | undefined
    altText?: string | undefined
}

import { roboto,leaguespartan } from "@/fonts";

export default function RadarHomePage({img,external_url,artist,title,altText}: RadarProps) {

    return (
        <div className={`p-[25px] bg-zinc-900 rounded-[15px] shadow-2xl flex flex-col items-center`}>
            <h1 className={`${leaguespartan.className} uppercase text-center text-[#f0f0f0] font-bold text-[1.5em] border-b-[1px]`}>Latest Tracks</h1><br />
            <Link href={external_url??'/'}><Image src={img?.url?? `/ak-logo.jpg`} height={300} width={300} alt={`${altText}`} className="rounded-[10px] hover:border-purple-400 border-transparent border-[1px]"/></Link>
            <div className="mt-2 text-[1em] text-center">
                <Link href={external_url??'/'} target="_blank"><h1 className={`${roboto.className} font-semibold max-w-full text-[#f0f0f0] hover:text-purple-300`}>{title}</h1></Link>
                <h2 className={`${roboto.className} text-purple-400 cursor-pointer max-w-[300px] left-0`}>{artist?.map((a) => {
                    return artist.indexOf(a) == (artist.length - 1) ?
                    <Link href={a?.external_urls.spotify} target="_blank" key={a?.name} className="hover:text-purple-300">{a?.name}</Link>
                    :
                    <Link href={a?.external_urls.spotify} target="_blank" key={a?.name} className="hover:text-purple-300">{a?.name}, </Link>
                })}</h2>
            </div>

        </div>
    )
}
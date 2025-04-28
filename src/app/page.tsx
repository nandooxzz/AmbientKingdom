"use client"
import Link from "next/link";
import { useEffect,useState } from "react";
import RadarHomePage from "@/components/radarHomePage";
import {SpotifyTrack} from "@/types";

import { artistsCollection } from "@/firebase";
import { DocumentData, getDocs } from "firebase/firestore";
import ArtistCarousel from "@/components/artistCarousel";

import {leaguespartan, poppins, exo} from "@/fonts"

export default function Home() {
  const [followers, setFollow] = useState({href: null, total: 0})
  const [radarTrack,setRadarTrack] = useState<SpotifyTrack>()
  const [artists, setArtists] = useState<DocumentData[]>()

  const getAccessToken = async () => {
    const auth = Buffer.from(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`).toString('base64')

    const grant = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const {access_token} = (await grant.json()) as {access_token: string}
    return access_token
  }

  const getPlaylist = async (id: string) => {
    const token = await getAccessToken();
    const reqFollows = await fetch(`https://api.spotify.com/v1/playlists/${id}`, { headers: {Authorization: `Bearer ${token}`} }).then(async (res) => { 
      const json = await res.json()
      const {followers} = (json) as {followers: {href: null, total: number}}
      const {tracks} = json as {tracks: {items:Array<{track:SpotifyTrack}>}}

      setFollow(followers)
      setRadarTrack(tracks.items[0].track)
    })
  }

  const getArtists = async () => {
    const snapshots = await getDocs(artistsCollection)
    const docs = snapshots.docs.map((doc) => doc.data())
    setArtists(docs)
  }

  useEffect(()=>{
    getPlaylist('5ggjTZJy8Xslwaotixt82V')
    getArtists()
  },[])

  return (
    <section className="w-full flex flex-col select-none">  
      <section className="w-full h-[750px] hero grid grid-cols-2 overflow-hidden">
        <div className="flex justify-center items-center flex-col text-left heroText">
          <div>
            <h1 className={`text-purple-50 font-bold text-[4.5em] leading-[0.9em] ${leaguespartan.className}`}>We are <br/><span className="text-[1.4em] heroSpan text-purple-000">Ambient<br/>Kingdom.</span></h1><br />
            <p className={`${poppins.className} text-white`}>Creators, soldiers and manteiners of <span className="heroSpanTag">ambient trap.</span></p>
            <h2 className={`text-white ${leaguespartan.className} font-bold text-[1.5em]`}><span className="heroSpanTag">{followers?.total}</span> currently following <Link href={'https://open.spotify.com/playlist/5ggjTZJy8Xslwaotixt82V?si=P7nCsFr6TsaAqwRwtuM8UA'} className="cursor-pointer" target="_blank"><span className="text-white hover: hover:text-purple-800 underline">us.</span></Link></h2>
          </div>
        </div>
        <div className="relative w-[100%] flex justify-center items-center heroRadar">
          <RadarHomePage img={radarTrack?.album.images[0]} title={radarTrack?.name} artist={radarTrack?.artists} url={radarTrack?.external_urls[0]} altText={radarTrack?.name}/>
        </div>
      </section>

      <section className="w-full p-[100px] text-black flex flex-col justify-center items-center textSect">
        <div className="shadow-md p-[40px] w-[45%] border-black border-[1px] rounded-md text">
          <p className={`${exo.className} font-normal text-[1.1em]`}>We are a community of producers, vanguards of <span className="text-purple-800">ambient trap/rap</span>, subgenre already started by prod. Adrian and ADTurnUp, guided by <span className="text-purple-800">us</span>.
            You&apos;ll also find here <span className="text-purple-800">house, lo-fi, DnB</span> & a lot more...
            <br/><br/>
            <Link href={"https://open.spotify.com/user/31unruzqwj6luxxkl7qi6s253c5y?si=554909d9f4aa41ae"} target="_blank"><span className="text-purple-800 hover:underline">Click here</span></Link> to see all of our Spotify playlists.
          </p>
        </div><br /><br />
        <div className="flex justify-center items-center flex-col w-full">
          <h1 className={`${poppins.className} font-bold text-[2.5em] text-purple-600`}>Artists</h1>
          <br />
          <ArtistCarousel artists={artists}/>
        </div>
      </section>
    </section>
  );
}
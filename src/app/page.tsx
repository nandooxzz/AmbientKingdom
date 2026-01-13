"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect,useState } from "react";
import RadarHomePage from "@/components/radarHomePage";
import {SpotifyTrack} from "@/types";

import { artistsCollection } from "@/firebase";
import { DocumentData, getDocs } from "firebase/firestore";
import ArtistCarousel from "@/components/artistCarousel";
import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

import {leaguespartan, poppins, exo,roboto} from "@/fonts"

export default function Home() {
  const [followers, setFollow] = useState({href: null, total: 0})
  const [radarTrack,setRadarTrack] = useState<SpotifyTrack[]>()
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
      const goTracks = [tracks.items[0].track, tracks.items[1].track, tracks.items[2].track, tracks.items[3].track, tracks.items[4].track, tracks.items[5].track, tracks.items[6].track, tracks.items[7].track,]
      setRadarTrack(goTracks)
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
      {/* awards div! */}
      <br />
      <Link href={`/awards`}>
        <div className="w-full flex justify-around items-center min-h-[15vh] bg-purple-600 rounded-sm text-white text-center aahmSection hover:bg-purple-700">
          <Image src={'/aa2-black.png'} width={175.75} height={101.75} alt="Ambient Awards 2026 Logo" className="invert-[100%] aahmLogo"/>
          <h2>AA 2026 is already here! Click on this section to start voting</h2>
        </div>
      </Link>

      <br /><br />

      <section className="w-full h-[750px] hero grid grid-cols-2 overflow-hidden">

        <div className="flex justify-center items-center flex-col text-left heroText">
          <div>
            <h1 className={`text-purple-50 font-bold text-[4.5em] leading-[0.9em] ${leaguespartan.className}`}>We are <br/><span className="text-[1.4em] heroSpan text-purple-000">Ambient<br/>Kingdom.</span></h1><br />
            <p className={`${roboto.className} text-white`}>Creators, soldiers and mainteiners of <span className="heroSpanTag">ambient trap.</span></p>
            <h2 className={`text-white ${roboto.className} font-bold text-[1.5em]`}><span className="heroSpanTag">{followers?.total}</span> currently following <Link href={'https://open.spotify.com/playlist/5ggjTZJy8Xslwaotixt82V?si=P7nCsFr6TsaAqwRwtuM8UA'} className="cursor-pointer" target="_blank"><span className="text-white hover: hover:text-purple-800 underline">us.</span></Link></h2>
          </div>
        </div>
        <div className="relative w-[100%] flex justify-center items-center heroRadar ">
          <Carousel className="w-[40%] p-4 heroCarousel"
            plugins={[
                            Autoplay({
                                delay: 5000
                            })
                        ]}>
            <CarouselContent className="items-center justify-between p-2">
              {radarTrack?.map((track) => {
                return <CarouselItem key={track?.name} className=""><RadarHomePage img={track?.album.images[0]} title={track?.name} artist={track?.artists} external_url={track?.external_urls?.spotify} altText={track?.name}/></CarouselItem>
              })}
            </CarouselContent>
            <CarouselPrevious className="text-black heroPrevious cursor-pointer"/>
            <CarouselNext className="text-black heroNext cursor-pointer"/>
          </Carousel>
        </div>
      </section>

      <section className="w-full p-[100px] text-black flex flex-col justify-center items-center textSect">
        <div className="shadow-md p-[40px] w-[45%] border-black border-[1px] rounded-md text">
          <p className={`${exo.className} font-normal text-[1.1em]`}>We are a community of producers, vanguards of <span className="text-purple-800">ambient trap/rap</span>, subgenre already started by prod. Adrian and ADTurnUp, guided by <span className="text-purple-800">us</span>.
            You&apos;ll also find here <span className="text-purple-800">house, lo-fi, DnB</span> & a lot more...
            <br/><br/>
            <Link href={"https://open.spotify.com/user/31unruzqwj6luxxkl7qi6s253c5y?si=554909d9f4aa41ae"} target="_blank"><span className="text-purple-800 hover:underline underline  ">Click here</span></Link> to see all of our Spotify playlists.
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
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, CarouselItem  } from "./ui/carousel";
import { Card, CardContent, CardFooter} from "./ui/card";
import { DocumentData } from "firebase/firestore";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay"


import Image from "next/image";
import Link from "next/link";
import { FaSpotify } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import {exo} from "@/fonts"

interface ACProps {
    artists: DocumentData[] | undefined
}

export default function ArtistCarousel({artists}: ACProps) {
    return (
        <Carousel className="w-[40%] max-[735px]:w-[65%] max-[571px]:w-full artistCarousel"
            plugins={[
                Autoplay({
                    delay: 2000
                })
            ]}>
            <CarouselContent>
                {                           
                    artists? artists.map((doc) => {
                        return (
                            <CarouselItem className="basis-1/3 max-[1669px]:basis-1/2 max-[1190px]:basis-full" key={doc?.name}>
                                <Card key={doc?.name} className="m-3 select-none border-black w-full">
                                    <CardContent className="p-5">
                                        {doc?.img ? <Image src={`${doc?.img}`} width={200} height={200} alt={`${doc?.name}`} className="rounded-md w-full h-full"/> : <Image src={`/ak-logo.jpg`} fill={true} alt={`${doc?.name}`} className="rounded-md"/>}
                                    </CardContent>
                                    <CardFooter className={`flex flex-col ${exo.className}`}>
                                        <h2 className={`font-semibold text-[1.3em]`}>{doc?.name}</h2>
                                        <p className="italic text-zinc-600 text-[0.85em] text-center">&quot;{doc?.tag}&quot;</p>
                                        <div className="mt-3">
                                            <Link href={`${doc?.spotify}`} target="_blank"><Button className="socialsButton"><FaSpotify/></Button></Link>
                                            <Link href={`${doc?.yt}`} target="_blank"><Button className="socialsButton"><FaYoutube/></Button></Link>
                                            <Link href={`${doc?.ig}`} target="_blank"><Button className="socialsButton"><FaInstagram/></Button></Link>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        )
                    }) : "Artists didn't load properly."
                }
            </CarouselContent>
            <CarouselNext/>
            <CarouselPrevious/>
        </Carousel>
    )
}
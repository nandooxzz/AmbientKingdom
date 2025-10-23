import { db,app,marketplaceCollection } from "@/firebase"
import { getDoc } from "firebase/firestore"
import { Card,CardHeader,CardTitle,CardContent,CardDescription,CardFooter } from "@/components/ui/card"
import { SearchParams } from "next/dist/server/request/search-params"
import Image from "next/image"

import { exo,poppins } from "@/fonts"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{id:string}>,
    searchParams: Promise<SearchParams>
}) {
    const {id} = await params
    const {name,img,download,description,author,price} = await searchParams
    return(
        <div className={`min-h-[90vh] marketplaceItemPage text-black flex justify-center items-center ${exo.className}`}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <CardDescription>
                    by {author}
                    <br/><br/>
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center flex-col w-full">
                  {img? <Image className="rounded-[10px]" src={`${img}`} width={250} height={250} alt={`${name}`}/> : <Image className="rounded-[10px]" src={`https://i.imgur.com/UnsJKPO.jpeg`} width={250} height={250} alt={`${name}`}/>}<br/>
                  <h1 className="text-[1.5em] font-bold">{price == '$0.00'? <span className="text-green-500 line-through">{price}</span> : price}</h1>
                </CardContent>
                <CardFooter className="flex-col gap-2 pb-10">
                  {
                    download? (
                      price == '$0.00' ? 
                        <Link href={`${download}`} target="_blank"><Button className="hover:cursor-pointer">DOWNLOAD</Button></Link> : 
                        <Link href={`${download}`}><Button>BUY NOW</Button></Link>) 
                        : "Download not available!"
                  }
                </CardFooter>
            </Card>
        </div>
    )
}
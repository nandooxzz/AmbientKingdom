import Image from "next/image"
import {leaguespartan, poppins, exo} from "@/fonts"
import { Button } from "./ui/button"
import Link from "next/link"

interface MPItem {
    author:string,description:string,download:string,img:string,name:string,id:string,price:string
}

export default function MarketPlaceItem(item:MPItem) {
    return (
        <div className="border-black border-[1px] w-[100%] p-10 flex justify-between items-center rounded-[10px] marketplace">
            {
                item?.img ? 
                    <Image src={`${item.img}`} width={200} height={200} alt={`Item Image`} className="rounded-[10px]"/> :
                    <Image src={`https://i.imgur.com/UnsJKPO.jpeg`} width={200} height={200} alt={`Item Image`} className="rounded-[10px]"/>
            }
            <div className={`w-full mt-5 text-right ${exo.className} mktTxt`}>
                <h1 className="font-bold text-[1.5em]">{item?.name}</h1>
                <h2>by {item?.author}</h2>
                <Link href={
                    {pathname: `/marketplace/${item?.id}`, query: {name: item?.name, download: item?.download, author: item?.author, description: item?.description, img: item?.img, price: item?.price}}
                }><Button className="bg-white text-black border-black border-[1px] mt-5 text-[1.1em] hover:text-white">SEE MORE</Button></Link>
            </div>
        </div>
    )
}
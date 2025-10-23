"use client"
import { poppins,exo } from "@/fonts"
import MarketPlaceItem from "@/components/marketplaceItem"
import {app,db,marketplaceCollection} from "@/firebase"
import { useState, useEffect } from "react"
import { DocumentData, getDocs } from "firebase/firestore"


export default function MarketPlacePage() {
    const [marketplace, setMkp] = useState<DocumentData[]>()

    const getMarketplace = async () => {
        const snapshots = await getDocs(marketplaceCollection)
        const docs = snapshots.docs.map((doc) => doc.data())
        console.log(docs)
        setMkp(docs)
    }

    useEffect(()=>{
        getMarketplace()
    },[])

    return (
        <section className="min-h-[90vh] flex flex-col justify-center items-center text-centert text-black">
            <h1 className={`${poppins.className} max-sm:text-[3em] text-[5em] font-[600]`}>Marketplace</h1><br />
            <div className="w-full flex justify-between items-center pl-[10%] pr-[10%]">
                {
                    marketplace? marketplace.map((item) => {
                        return <MarketPlaceItem author={item?.author} description={item?.description} download={item?.download} img={item?.img} name={item?.name} id={item?.id} key={item?.name} price={item?.price}/>
                    }) : "No items found"
                }
            </div>
        </section>
    )
}
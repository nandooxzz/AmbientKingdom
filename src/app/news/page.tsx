"use client"

import {app,db,newsCollection} from "@/firebase"
import { useState, useEffect } from "react"
import { DocumentData, getDocs } from "firebase/firestore"
import NewsItem from "@/components/newsItem"
import { Empty,EmptyContent,EmptyHeader,EmptyDescription,EmptyTitle,EmptyMedia } from "@/components/ui/empty"
import { FaNewspaper } from "react-icons/fa6"
import Link from "next/link"

export default function NewsPage() {
    const [news, setNews] = useState<DocumentData[]>([])

    const getNews = async () => {
        const snapshots = await getDocs(newsCollection)
        const docs = snapshots.docs.map((doc) => doc.data())
        setNews(docs)
    }

    useEffect(() => {
        getNews()
    },[])

    return (
        <section className="flex justify-around w-full ">
            {news.length? news.map(n => {
                return (<NewsItem key={n?.id?? 'newsitem'} author={n?.author} content={n?.content} date={n?.date} id={n?.id} subtitle={n?.subtitle} title={n?.title} avatar={n?.avatar} cover={n?.cover}/>)
            }) : 
            <div>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <FaNewspaper/>
                        </EmptyMedia>
                        <EmptyTitle>No Blog Posts Yet</EmptyTitle>
                        <EmptyDescription>
                        Meanwhile, visit our <span className="underline hover:text-purple-600 duration-100"><Link href={'/marketplace'}>marketplace!</Link></span>
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </div>
            }
        </section>
    )
}
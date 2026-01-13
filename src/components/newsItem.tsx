import Image from "next/image"
import Link from "next/link"
import {roboto} from "@/fonts"

import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogClose, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface NItem {
    author:string,content:string,date:Date,title:string,subtitle:string,id:string,avatar:string,cover:string
}

export default function NewsItem(item:NItem) {                                                                                  
    return (
        <div className={`border-black border-[1px] p-8 flex justify-center items-center text-center rounded-[10px] newsItem ${roboto.className}`} key={item?.id}>
            <div className={`mt-5 ${roboto.className} mktTxt`}>
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
                    <Image
                        src={item?.cover && (item?.cover != ' ')? item?.cover : `/ak-logo.jpg`}
                        alt="Post cover"
                        fill
                        className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </AspectRatio>
                
                <br />
                <h1 className="font-bold text-[1.5em]">{item?.title}</h1>
                <h2 className="w-full flex justify-center items-center">by {item?.author} 
                                <Avatar className="size-8 ml-2">
                                    <AvatarImage src={item?.avatar? `${item?.avatar}` : `/ak-logo.jpg`} alt="@shadcn"/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar> 
                </h2><br />

                <Dialog >
                    <form>
                        <DialogTrigger asChild>
                            <Button>See More</Button>
                        </DialogTrigger>
                        <DialogContent className={`${roboto.className} select-none newsDialog`}>
                            <DialogHeader className="border-[#cccccc] border-b-[1px] pb-3">
                                <DialogTitle>{item?.title}</DialogTitle>
                                <DialogDescription>{item?.subtitle}<br/>by {item?.author}</DialogDescription>
                            </DialogHeader>
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={
                                {
                                    h1: ({node, ...props}) => (
                                        <h1 className="text-[1.5em] font-[600]" {...props}/>
                                    ),
                                    h2: ({node, ...props}) => (
                                        <h2 className="text-[1.2em] font-[600]" {...props}/>
                                    ),
                                    a: ({node, ...props}) => (
                                        <a className="underline hover:text-purple-800" {...props}></a>
                                    ),
                                    img: ({ node, ...props }) => {
                                        if (!props.src) return null;
                                        const src = props.src as string;
                                        return (
                                            <Image
                                            src={src}
                                            alt={props.alt ?? ""}
                                            width={200}
                                            height={300}
                                            className="rounded"
                                            />
                                        );
                                    },
                                }
                            }>
                                {item?.content}
                            </ReactMarkdown>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button>Close</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>
        </div>
    )
}
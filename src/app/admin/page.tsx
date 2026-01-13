"use client"

import { useAuth } from "@/components/authContext"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { setDoc,doc,serverTimestamp, getDoc } from "firebase/firestore"
import { auth, db } from "@/firebase"
import { useState, FormEvent } from "react"
import Image from "next/image"
import Cookies from "js-cookie"
import rehypeHighlight from "rehype-highlight";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion"
import { Field,FieldDescription,FieldGroup,FieldLabel,FieldSet } from "@/components/ui/field"

import { poppins } from "@/fonts"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Dialog, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogContent } from "@radix-ui/react-dialog"
import { toast } from "sonner"

export default function AdminPage() {
    const { user, loading } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // logado & post creator
    const [contentMarkdown, setContentTxt] = useState("")
    const [title,setTitle] = useState("")
    const [subtitle, setSub] = useState("")
    const [author, setAuthor] = useState("")
    const [avatar, setAvatar] = useState("")
    const [cover, setCover] = useState("")

    if (loading) return null

    // 🔒 NÃO LOGADO → LOGIN
    if (!user) {
        async function handleLogin() {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                const token = await userCredential.user.getIdToken()
                Cookies.set("token", token, { expires: 5 }) // 1 dia de expiração
                setError("")
            } catch {
                setError("Invalid email or password.")
            }
            
        }

        return (
            <div className="flex mt-[15vh] items-center justify-center">
                <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Admin</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                    <p className="text-sm text-red-500">{error}</p>
                    )}

                    <Button className="w-full" onClick={handleLogin}>
                    Entrar
                    </Button>
                </CardContent>
                </Card>
            </div>
        )
    }

    async function handleLogout() {
        await signOut(auth)
        Cookies.remove("token")
    }

    async function handlePost () {
        const docName = new Date();
        const date = serverTimestamp()
        
        const id = docName.toLocaleDateString(`en-US`, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }).replaceAll(`/`,'')

        let i = 0

        while ((await getDoc(doc(db, 'news', `${id}${i}`))).data()) {
            i++
        }

        const finalName = `${id}${i}`

        try {
            setDoc(doc(db, 'news', finalName), {
                author, avatar, content:contentMarkdown, cover, date, finalName, subtitle, title
            })
            toast.info(`Post created successfully`)
        } catch (error) {
            toast.error(`${error}`)
        }

        setContentTxt('')
        setTitle('')
        setSub('')
        setAvatar('')
        setCover('')
        setAuthor('')
    }

    // ✅ LOGADO → ADMIN
    return (
        <section className="p-6">
            <h1 className={`text-[2em] font-[600] ${poppins.className}`}>Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">
                Logged as {user.email}
            </p><br/>
            <Button onClick={()=>handleLogout()}>LOGOUT</Button><br /><br />

            <Accordion collapsible type="single">
                <AccordionItem value={"item-1"}>
                    <AccordionTrigger>Create a new blog post</AccordionTrigger>
                    <AccordionContent className="p-10">
                            <FieldSet>
                                <Field>
                                    <FieldLabel htmlFor="title">Title</FieldLabel>
                                    <Input id="title" type="text" placeholder="Type the main title of your post" onChange={(e) => setTitle(e.target.value)}/>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="subtitle">Subtitle/Lead</FieldLabel>
                                    <Input id="subtitle" type="text" placeholder="Type the subtitle of your post" onChange={(e) => setSub(e.target.value)}/>
                                    <FieldDescription>
                                        Write the main topics of the post, something attractive, where/what/when?...
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="username">Content</FieldLabel>
                                    <div className="flex w-full justify-between newsContent">
                                        <div className="w-[50%] p-1 newsTxtarea">
                                            <label>Editing</label>
                                            <Textarea placeholder="Type the content of your post" onChange={(e) => setContentTxt(e.target.value)}/>
                                        </div>
                                        <div className="w-[50%] p-2 ml-5 newsTxtarea border-[1px] rounded-sm">
                                            <label>Preview</label><br />

                                            <ReactMarkdown rehypePlugins={[rehypeHighlight,remarkGfm]}
                                                components={
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
                                                }
                                            >
                                                {contentMarkdown}
                                            </ReactMarkdown>

                                        </div>
                                    </div>
                                    <FieldDescription>
                                        Write your post content with Markdown language. 
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="author">Author</FieldLabel>
                                    <Input id="author" type="text" placeholder="Enter your name" onChange={(e) => setAuthor(e.target.value)}/>
                                </Field>
                                <Field>
                                    <div className="flex newsContent">
                                        <div className="w-[50%] newsTxtarea p-1">
                                            <FieldLabel htmlFor="author">Avatar</FieldLabel>
                                            <Input id="author" type="text" placeholder="Enter a image link to your avatar" onChange={(e) => setAvatar(e.target.value)}/>
                                        </div>
                                        <div className="w-[50%] newsTxtarea p-1">
                                            <FieldLabel htmlFor="author">Cover</FieldLabel>
                                            <Input id="author" type="text" placeholder="Enter a image link to your post's cover" onChange={(e) => setCover(e.target.value)} />
                                        </div>
                                    </div>
                                </Field>
                                <Field>
                                    <Button className="bg-purple-500 hover:bg-purple-600" onClick={() => handlePost()}>SUBMIT</Button>
                                </Field>
                            </FieldSet>    
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <br />

            <Dialog>
                <DialogTrigger className="text-purple-600">Click here for a quick Markdown guide.</DialogTrigger>
                    <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Markdown Guide</DialogTitle>
                            </DialogHeader>
                            <Image src={`/markdownguide.png`} width={1000} height={469} alt="Markdown Guide"/>
                    </DialogContent>
            </Dialog>
        </section>
    )
}
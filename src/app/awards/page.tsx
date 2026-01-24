import { roboto, poppins, exo } from "@/fonts"
import Image from "next/image"
import Link from "next/link"

import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

// #232221 

export default function homeV2() {
    return (
        <section className="w-full flex justify-between min-h-[50vh] select-none mt-[10vh] awardsSection">
            <section className="w-[50%] awardsText"> 
                <h1 className={`${poppins.className} text-[3em] font-[600]`}>Welcome to Ambient Awards!</h1>
                <p>
                    It’s time to officially start organizing the next <b>Ambient Awards.</b>
                </p><br/>

                <Accordion type="single" collapsible className="">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is this?</AccordionTrigger>
                        <AccordionContent>
                            <p>
                                <span className="text-purple-800">
                                <b>TIER/LEAGUES:</b><br/>

                                Underground Producers
                                <br/>
                                Mid Tier Producers
                                <br/>
                                Top Tier Producers</span>

                                <br/><br/>
                                The goal is to <b>highlight the BEST WORK within each group, not just who has the most reach.</b>
                                <br/><br/>
                                Another important change:<br/>
                                <b>From now on, anyone who wants to participate must submit their own entries.</b>
                                <br/><br/>
                                <b>Each producer will choose their 2 best tracks (according to themselves)</b> to compete in the Ambient Awards 2026.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>To be more fair</AccordionTrigger>
                        <AccordionContent>
                            <p>
                                Some time ago, a few key members of the community discussed something important:<br/>
                                <b>the awards shouldn’t be only about numbers or streams.</b> Talent exists at different stages,<br/> and comparing everyone in the same bag isn’t always fair.
                                <br/><br/>
                                So the idea moving forward is to <b>recognize producers by tiers / leagues,</b> for example: Undergroud, Mid Tier, Top Tier producers.
                                

                                This keeps things <b>fair, focused, and manageable — quality over quantity.</b><br/><br/>

                                This also helps the voting process be more meaningful, <b>since listeners</b> will be comparing a <b>clear, curated selection</b> instead of huge catalogs.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>For our producers</AccordionTrigger>
                        <AccordionContent>
                            <p>
                                {/* <b>If you want to send your songs to us,</b> be sure to be on our <span className="text-blue-600 hover:text-blue-700 underline"><Link href={'/contact'}>Discord</Link></span><br/>
                                Any producer who registers and <b>is not on our Discord will be disqualified.</b><br/>
                                Please, fill up the form below: */}
                                The subscription form <b>has been already closed!</b>
                            </p><br/>
                            {/* <Link href={`https://forms.gle/qRR6XP2tqqaUk3HL9`} target="_blank"><Button variant={"ghost"} disabled>SUBSCRIPTION FORM</Button></Link> */}
                            <Button variant={"ghost"} disabled>SUBSCRIPTION FORM</Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <br/>

                <p> More details about categories, tiers, and voting will be shared soon.<br/>
                    We'll recognize effort, growth, and sound — at every level of the community.<br/><br/>

                    Ambient Kingdom is growing, and the awards need to grow with it.
                </p><br />
                <Button variant={"default"} className="bg-purple-500 hover:bg-purple-600" disabled>VOTE BY GOOGLE FORMS</Button><br/>
                <label className="text-[.8em] text-red-600">Voting not available yet!</label>
            </section>
            <div className="awardsLogo">
                <Image src={`/aa2-black.png`} width={351.5} height={203.5} alt="Ambient Awards 2026 logo" className=""/>
            </div>
        </section>
    )
}
import { FaBars } from "react-icons/fa6"
import { NavigationMenu,NavigationMenuContent,NavigationMenuTrigger,NavigationMenuLink, NavigationMenuList, NavigationMenuItem } from "./ui/navigation-menu"
import Link from "next/link"

export default function Hamburguer() {
    return (
            <NavigationMenu className="hamburguer">
                <NavigationMenuList className="flex-wrap">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger><FaBars className="text-[1.5em]"/></NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="flex flex-col">
                                <NavigationMenuLink asChild className="m-1">
                                    <Link href="/awards" className="text-[.6em]">Awards 2025</Link>
                                </NavigationMenuLink>

                                <NavigationMenuLink asChild className="m-1">
                                    <Link href="/marketplace" className="text-[.6em]">Marketplace</Link>
                                </NavigationMenuLink>

                                <NavigationMenuLink asChild className="m-1">
                                    <Link href="/news" className="text-[.6em]">News</Link>
                                </NavigationMenuLink>

                                <NavigationMenuLink asChild className="m-1">
                                    <Link href="/contact" className="text-[.6em]">Contact</Link>
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
    )
}
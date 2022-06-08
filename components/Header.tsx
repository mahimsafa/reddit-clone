import Image from "next/image"
import React from "react"
import {
    BellIcon,
    ChatIcon,
    GlobeIcon,
    PlusIcon
} from '@heroicons/react/outline'
import {
    ChevronDownIcon,
    HomeIcon,
    SearchIcon,
    MenuIcon
} from '@heroicons/react/solid'
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import HeaderMenu from "./Menu"

function Header() {
    const { data: session } = useSession()

    function handleSignIn() {
        signIn()
    }
    function handleSignOut() {
        signOut()
    }

    return (
        <div className="flex bg-white px-4 py-2 shadow-sm sticky top-0 z-50 items-center">
            <Link href="/">
                <a className="relative h-10 w-20 flex-shrink-0 cursor-pointer  ">
                    <Image
                        objectFit="contain"
                        src='https://links.papareact.com/fqy'
                        layout="fill"
                    />
                </a>
            </Link>
            <div className="flex items-center mx-7 xl:min-w-[300px]">
                <HomeIcon className="h-5 w-5" />
                <p className="flex-1 ml-2 hidden lg:inline">Home</p>
                <ChevronDownIcon className="h-5 w-5" />
            </div>

            {/* search box */}

            <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1 ">
                <SearchIcon className="h-5 w-5 text-gray-400" />
                <input className="flex-1 bg-transparent outline-none " type="text" placeholder="Search..." />
                <button hidden type="submit" />
            </form>

            <div className="space-x-2 items-center px-2 py-1 text-gray-500 hidden lg:inline-flex ">
                <BellIcon className="icon" />
                <ChatIcon className="icon" />
                <GlobeIcon className="icon" />
                <PlusIcon className="icon" />

            </div>
            <div className="ml-3 lg:hidden text-gray-500 items-center flex">
                <MenuIcon className="icon" />
            </div>
            {/* sign in / sign out button  */}
            {session ?
                <HeaderMenu handleSignOut={handleSignOut}>
                    <div className="hidden items-center p-2 cursor-pointer space-x-2 border border-gray-100 lg:flex">
                        <div className="relative flex-shrink-0 w-5 h-5 ">

                            <Image className="overflow-hidden rounded-full" src={session?.user?.image || 'https://links.papareact.com/23l'} objectFit="contain" layout="fill" />
                        </div>
                        <div className="flex-1 text-xs">
                            <p className="truncate">{session?.user?.name}</p>
                            <p className="text-gray-400">Balance: 0</p>
                        </div>
                        <ChevronDownIcon className="h-5 w-5 flex-shrink-0 text-gray-300" />
                    </div>
                </HeaderMenu>
                :
                <div onClick={handleSignIn} className="hidden items-center p-2 cursor-pointer space-x-2 border border-gray-100 lg:flex">
                    <div className="relative flex-shrink-0 w-5 h-5 ">

                        <Image src='https://links.papareact.com/23l' objectFit="contain" layout="fill" />
                    </div>
                    <p className="text-gray-400">Sign In</p>

                </div>

            }
        </div>
    )
}

export default Header
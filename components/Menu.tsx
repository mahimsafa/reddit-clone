import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import React from 'react'
import { useRouter } from 'next/router'


type Props = {
    children: React.ReactNode
    handleSignOut: () => void
}


export default function Example({ children, handleSignOut }: Props) {
    const router = useRouter()
    const menuItems = [
        { title: 'Home', action: () => router.push('/') },
        { title: 'About', action: () => router.push('/about') },
        { title: 'Contact', action: () => router.push('/contact') },
        { title: 'Sign Out', action: () => handleSignOut() },
    ]
    return (
        <Menu as="div">
            <Menu.Button >
                {children}
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 flex flex-col ">
                        {menuItems.map((item, index) => (
                            <Menu.Item key={index}>
                                <div className=' hover:bg-violet-500 hover:text-white group w-full rounded-md px-2 py-2 text-sm cursor-pointer' onClick={item.action}>
                                    {item.title}
                                </div>
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}


'use client'
import * as React from 'react';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import Link from "next/link";

type listMenu = {
    title: string,
    icon?: string,
    href: string,
    subMenu?: listMenu[]
}

const listMenu: listMenu[] = [
    {
        title: 'Home',
        icon: 'dashboard',
        href: '/home'
    },
    {
        title: 'Todos',
        icon: 'todo',
        href: '/todos'
    },
    {
        title: 'Users',
        icon: 'users',
        href: '/users'
    },
    {
        title: 'Masterdata',
        icon: 'masterdata',
        href: '/masterdata',
        subMenu: [
            {
                title: 'Categories',
                href: '/cms/ms/todo-categories'
            },
            {
                title: 'Schedule',
                href: '/cms/ms/todo-schedules'
            }
        ]
    },
    {
        title: 'Settings',
        icon: 'settings',
        href: '/settings'
    },
]
export default function __Sidebar_() {
    return (
        <>
            <div className="mt-4 px-4">

                <Command>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandSeparator />
                        {listMenu && listMenu.map((item, index) => (
                            <CommandGroup heading={item.title} key={index}>
                                {item.subMenu && item.subMenu.map((subItem, subIndex) => (
                                    <Link href={subItem.href} key={subIndex}>
                                        <CommandItem>{subItem.title}</CommandItem>
                                    </Link>
                                ))}
                            </CommandGroup>
                        ))
                        }
                    </CommandList>
                </Command>
            </div>
        </>
    );
};
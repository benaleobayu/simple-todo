'use client'
import * as React from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import Link from "next/link";

type listMenu = {
    title: string,
    type?: 'group' | 'item',
    icon?: string,
    href: string,
    subMenu?: listMenu[]
}

const listMenu: listMenu[] = [
    {
        title: 'Home',
        type: 'item',
        icon: 'dashboard',
        href: '/home'
    },
    {
        title: 'Todos',
        type: 'item',
        icon: 'todo',
        href: '/cms/todos'
    },
    {
        title: 'Users',
        icon: 'users',
        href: '/cms/a/users'
    },
    {
        title: 'Masterdata',
        type: 'group',
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
                    <CommandInput placeholder="Type a command or search..."/>
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandSeparator/>
                        {listMenu && listMenu.map((item, index) => (
                            item.type === 'group' ? (
                                    <CommandGroup heading={item.title} key={index}>
                                        {item.subMenu && item.subMenu.map((subItem, subIndex) => (
                                            <Link href={subItem.href} key={subIndex}>
                                                <CommandItem>{subItem.title}</CommandItem>
                                            </Link>
                                        ))}
                                    </CommandGroup>
                                )
                                :
                                (
                                    <Link href={item.href} key={index}>
                                        <CommandItem>{item.title}</CommandItem>
                                    </Link>
                                )
                        ))
                        }
                    </CommandList>
                </Command>
            </div>
        </>
    );
};
'use client'
import * as React from 'react';
import Image from "next/image";
import {Profile_Edit} from "@/app/cms/p/profile/Form_Edit";


export default function Page() {

    return (
        <section className="my-12">
            <div className="container flex min-h-[80vh] py-12 bg-slate-200">
                <div className="w-full max-w-sm">
                    <div className="w-full aspect-square rounded-full overflow-hidden">
                        <Image className="object-cover"
                               src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                               alt="image" width={500} height={500}/>
                    </div>
                </div>
                <div className="w-full">
                    <div className="container">
                        <div className="w-full px-4 py-2 gap-2 shadow rounded-md bg-white flex flex-col relative">
                            <Profile_Edit isEdit/>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
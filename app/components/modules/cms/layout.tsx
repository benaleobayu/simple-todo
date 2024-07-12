// @flow
import * as React from 'react';
import __Sidebar_ from "@/app/components/Global/Sidebar/Sidebar";

type Props = {
    children: React.ReactNode
};

export default function __Layout_CMS(props: Props) {
    const {children} = props
    return (
        <>
            <div className="flex w-full min-h-screen">
                <div className="basis-1/4 bg-slate-200">
                    <__Sidebar_/>
                </div>
                <div className="basis-3/4 p-4">
                    {children}
                </div>
            </div>
        </>
    );
};
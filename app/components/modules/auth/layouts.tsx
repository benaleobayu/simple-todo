// @flow
import * as React from 'react';
import __FormLogin from "@/app/components/modules/auth/form_login";

type PropsLayout = {
    children: React.ReactNode,
    title : string
}
export default function __Layouts_Auth({children, title}: PropsLayout) {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-[500px] mx-auto p-6 bg-white rounded-lg shadow-lg overflow-hidden sm:p-10 grid gap-2">
                    <h1 className="text-3xl font-bold">
                        {title}
                    </h1>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};
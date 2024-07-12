// @flow
import * as React from 'react';
import __Layouts_Auth from "@/app/components/modules/auth/layouts";
import __FormLogin from "@/app/components/modules/auth/form_login";
import Link from "next/link";

type Props = {

};
export const metadata = {
    title: 'Login',
};
export default function Page(props: Props) {
    return (
        <div >
            <__Layouts_Auth title="Login">
                <__FormLogin/>
                <div className="text-slate-600 mt-4">
                    Are you dont have an account? <Link className="text-blue-600 hover:text-blue-800" href="/auth/register">Register Here</Link>
                </div>
            </__Layouts_Auth>
        </div>
    );
};
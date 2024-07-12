// @flow
import * as React from 'react';
import __Layouts_Auth from "@/app/components/modules/auth/layouts";
import __FormRegister from "@/app/components/modules/auth/form_register";
import Link from "next/link";

type Props = {};
export default function Page(props: Props) {
    return (
        <div>
            <__Layouts_Auth title="Register">
                <__FormRegister/>
                <div className="text-slate-600 mt-4">
                    Do you have an account? <Link className="text-blue-600 hover:text-blue-800" href="/auth/login">Login Here</Link>
                </div>
            </__Layouts_Auth>
        </div>
    );
};
// @flow
import * as React from 'react';
import __Navbar_ from "@/app/components/Global/Navbar/navbar";
import * as child_process from "child_process";
import __Layout_CMS from "@/app/components/modules/cms/layout";

type Props = {
    children: React.ReactNode
};
export default function Layout(props: Props) {
    const {children} = props;
    return (
        <>
            <__Navbar_/>
            <__Layout_CMS>
                {children}
            </__Layout_CMS>
        </>
    );
};
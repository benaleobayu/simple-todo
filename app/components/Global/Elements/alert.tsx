// @flow
import * as React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {Terminal} from "lucide-react";

type Props = {
    children: React.ReactNode,
    variant?: "default" | "destructive"
};
export default function _Alert_Msg(props: Props) {
    const {children, variant} = props
    return (
        <>
            <Alert className="fixed bottom-3 right-3 max-w-sm" variant={variant}>
                <AlertDescription>
                    {children}
                </AlertDescription>
            </Alert>

        </>
    );
};
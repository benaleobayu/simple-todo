// @flow
import * as React from 'react';
import Todos_DataTable from "@/app/cms/todos/data_table";

type Props = {

};
export default function Page(props: Props) {
    return (
        <div className="px-12 py-6 mx-auto">
            <Todos_DataTable/>
        </div>
    );
};
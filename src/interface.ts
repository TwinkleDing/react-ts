import React from "react";
export type RouterType = {
    path: string,
    name: string,
    component: any,
    routes?: Array<any>
}

export interface progressTableListType {
    key: number,
    userId: number,
    userName: string,
    workTime: number,
    setting: any
}

export interface progressTableType {
    selectedRowKeys: number[],
    onSelectChange: any,
    data: progressTableListType[]
}

export interface progressStateType {
    selectedRowKeys: number[]
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    children: React.ReactNode;
}

export interface UndoneItem {
    key: string;
    name: string;
    age: number;
    address: string;
}

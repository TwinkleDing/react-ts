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

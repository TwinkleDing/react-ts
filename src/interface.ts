export type RouterType = {
    path: string,
    name: string,
    component: any,
    routes?: Array<any>
}
export interface progressTableListType {
    key: number,
    age: number,
    name: string,
    address: string
}
export interface progressTableType {
    selectedRowKeys: number[],
    onSelectChange: any,
    data: progressTableListType[]
}
export interface progressStateType {
    selectedRowKeys: number[]
}

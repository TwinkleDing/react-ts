import React, { useState, useEffect } from "react";
import { Divider, Table, Space, message, Popconfirm, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import ManagementApi from "@/api/modules/ManagementApi";
import style from "@/css/modules/management.module.scss";
const { Search } = Input;

interface DataType {
    key: React.Key;
    userName: string;
    age: string;
    departmentName: number;
    positionName: string;
}
const columns: ColumnsType<DataType> = [
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName"
    },
    {
        title: "年龄",
        dataIndex: "age",
        key: "age"
    },
    {
        title: "部门",
        dataIndex: "departmentName",
        key: "departmentName"
    },
    {
        title: "职位",
        dataIndex: "positionName",
        key: "positionName"
    },
    {
        title: "Action",
        key: "action",
        width: "200px",
        // eslint-disable-next-line react/display-name
        render: (_, record) =>
            <Space size="middle">
                <a onClick={() => { console.log(record); }}>修改</a>
                <div>{deleteBtn(record)}</div>
            </Space>

    }
];
const deleteBtn = (record: any) => <Popconfirm
    title="确定删除此人员么?"
    onConfirm={() => deleteUser(record)}
    okText="确定"
    cancelText="取消"
>
    <a href="#">删除</a>
</Popconfirm >;

const deleteUser = (record: any) => {
    message.success("删除成功！");
    console.log(record);
};

const Management: React.FC = () => {
    const [userList, setUserList] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    // 当[]监听的值发生改变，去执行里面的方法
    useEffect(() => {
        // 获取用户列表
        getList();
    }, [searchValue]);

    const onSearch = (value: string) => {
        setSearchValue(value);
    };

    const getList = () => {
        ManagementApi.getUserList({
            userName: searchValue
        }).then((res: any) => {
            res.data.map((item: any) => {
                item.key = item.userId;
            });
            setUserList(res.data);
        });
    };

    return (
        <div>
            <Divider orientation="left">人员管理</Divider>
            <div className={style.handle}>
                <Search
                    className={style.searchInput}
                    placeholder="请输入姓名搜索"
                    allowClear
                    enterButton="搜索"
                    onSearch={onSearch}
                />
                <Button type="primary">新建</Button>
            </div>
            <Table className={style.table} dataSource={userList} columns={columns} />
        </div >
    );
};

export default Management;

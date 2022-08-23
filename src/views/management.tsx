import React, { useState, useEffect } from "react";
import { Divider, Table } from "antd";
import ManagementApi from "@/api/modules/ManagementApi";

const Management: React.FC = () => {
    const [userList, setUserList] = useState([]);
    const columns = [
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
        }
    ];

    useEffect(() => {
        // 获取用户列表
        ManagementApi.userList().then((res: any) => {
            res.data.map((item: any) => {
                item.key = item.userId;
            });
            setUserList(res.data);
        });

    }, []);
    return (
        <div>
            <Divider orientation="left">人员管理</Divider>
            <Table dataSource={userList} columns={columns} />;
        </div >
    );
};

export default Management;

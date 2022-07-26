import React, { useState, useEffect } from "react";
import { Divider, Descriptions } from "antd";
import store from "@/store/index";
import MyApi from "@/api/my";

export default function My() {
    const [info, setInfo] = useState({
        userName: "",
        userId: "",
        department: "",
        position: ""
    });

    useEffect(() => {
        const userId = store.getState()?.userInfo.value.userId;

        MyApi.getInfo({ userId }).then((res: any) => {
            setInfo(res.data);
            console.log(res.data);
        });
    }, []);

    return (
        <div className="my">
            <Divider orientation="left">我的信息</Divider>
            <div className="my-table">
                <Descriptions bordered>
                    <Descriptions.Item label="姓名" span={3}>{info.userName}</Descriptions.Item>
                    <Descriptions.Item label="工号" span={3}>{info.userId}</Descriptions.Item>
                    <Descriptions.Item label="部门" span={3}>{info.department}</Descriptions.Item>
                    <Descriptions.Item label="职位" span={3}>{info.position}</Descriptions.Item>
                </Descriptions>
            </div>
        </div >
    );
}

import React from "react";
import { Divider, Descriptions } from "antd";

export default class My extends React.Component {
    public render() {
        return (
            <div className="my">
                <Divider orientation="left">我的信息</Divider>
                <div className="my-table">
                    <Descriptions bordered>
                        <Descriptions.Item label="姓名" span={3}>丁玉亮</Descriptions.Item>
                        <Descriptions.Item label="工号" span={3}>1</Descriptions.Item>
                        <Descriptions.Item label="部门" span={3}>1</Descriptions.Item>
                        <Descriptions.Item label="职位" span={3}>开发</Descriptions.Item>
                        <Descriptions.Item label="PL" span={3}>开发</Descriptions.Item>
                        <Descriptions.Item label="HRBP" span={3}>开发</Descriptions.Item>
                    </Descriptions>
                </div>
            </div >
        );
    }
}

import React, { useState } from "react";
import { Divider, Table, Empty, Button, Popconfirm } from "antd";
import { progressTableListType, progressTableType, progressStateType } from "../interface";

const columns = [
    {
        title: "工号",
        dataIndex: "userId"
    },
    {
        title: "姓名",
        dataIndex: "name"
    },
    {
        title: "工时",
        dataIndex: "workTime"
    },
    {
        title: "操作",
        dataIndex: "setting",
        width: "200px"
    }
];


const listData: progressTableListType[] = [];

for (let i = 0; i < 46; i++) {
    listData.push({
        key: i,
        name: `Edward King ${i}`,
        userId: i,
        workTime: i,
        setting: <SettingColumn userId={i} />
    });
}

export default class Progress extends React.Component<any, progressStateType> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedRowKeys: []
        };

    }
    onSelectChange = (chooseKeys: number[]) => {
        console.log("selectedRowKeys changed: ", chooseKeys);
        this.setState({
            selectedRowKeys: chooseKeys
        }, () =>
            console.log(this.state)
        );
    };
    render() {
        return (
            <div className="progress">
                <Divider orientation="left">进行中的任务</Divider>
                <Empty />
                <Divider orientation="left">任务详情</Divider>
                <ProgressTable
                    data={listData}
                    selectedRowKeys={this.state.selectedRowKeys}
                    onSelectChange={this.onSelectChange} />
            </div>

        );
    }
}

function ProgressTable(props: progressTableType) {
    const { selectedRowKeys, onSelectChange, data } = props;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE
        ]
    };

    return (
        <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data} />
    );
}

function SettingColumn(props: any) {
    const [urgedVisible, setUrgedVisible] = useState(false);
    const [abnormalVisible, setAbnormalVisible] = useState(false);
    const [buttonClick, setButtonClick] = useState(false);
    let urged = (userId: number) => {
        console.log(userId);
        setUrgedVisible(true);
        setButtonClick(true);
    };
    let abnormal = (userId: number) => {
        console.log(userId);
        setAbnormalVisible(true);
        setButtonClick(true);
    };
    let confirm = (type: string) => {
        if (type === "urged") {
            setUrgedVisible(false);
        } else {
            setAbnormalVisible(false);
        }
    };

    let cancel = (type: string) => {
        if (type === "urged") {
            setUrgedVisible(false);
        } else {
            setAbnormalVisible(false);
        }
    };
    let handleVisibleChange = (type: string) => {
        console.log(type);
        if(!buttonClick) {
            return;
        }
        setAbnormalVisible(false);
        setUrgedVisible(false);
        setButtonClick(false);
    };

    return (
        <div className="progress-setting">
            <Popconfirm
                title="Are you sure delete this task?"
                visible={urgedVisible}
                onVisibleChange={() => handleVisibleChange("urged")}
                onConfirm={() => confirm("urged")}
                onCancel={() => cancel("urged")}
                okText="Yes"
                cancelText="No">
                <Button
                    onClick={() => urged(props.userId)}
                    className="progress-setting-urged"
                    type="primary">催</Button>
            </Popconfirm>
            <Popconfirm
                title="Are you sure delete this task?"
                visible={abnormalVisible}
                onVisibleChange={() => handleVisibleChange("abnormal")}
                onConfirm={() => confirm("abnormal")}
                onCancel={() => cancel("abnormal")}
                okText="Yes"
                cancelText="No">
                <Button
                    onClick={() => abnormal(props.userId)}
                    type="primary"
                    danger>异</Button>
            </Popconfirm>
        </div>
    );
}

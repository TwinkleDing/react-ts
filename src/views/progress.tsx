import React from "react";
import { Divider, Table, Empty } from "antd";
import { progressTableListType, progressTableType, progressStateType } from "../interface";

const columns = [
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Age",
        dataIndex: "age"
    },
    {
        title: "Address",
        dataIndex: "address"
    }
];


const listData: progressTableListType[] = [];

for (let i = 0; i < 46; i++) {
    listData.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
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

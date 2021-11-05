import React from "react";
import { Divider, Table, Empty } from "antd";

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

interface aa {
    key: number,
    age: number,
    name: string,
    address: string
}
const data: aa[] = [];

for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
    });
}
export default class Progress extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            selectedRowKeys: [1]
        };

    }
    onSelectChange = (chooseKeys: any) => {
        console.log("selectedRowKeys changed: ", chooseKeys);
        this.setState({
            selectedRowKeys: chooseKeys
        });
    };
    render() {
        return (
            <div className="progress">
                <Divider orientation="left">进行中的任务</Divider>
                <Empty />
                <Divider orientation="left">任务详情</Divider>
                <ProgressTable data={data} selectedRowKeys={this.state.selectedRowKeys} onSelectChange={this.onSelectChange.bind(this)} />
            </div>

        );
    }
}

function ProgressTable(props: any) {
    console.log(props);
    let onSelectChange = (chooseKeys: any) => {
        props.onSelectChange(chooseKeys);
    };

    const { selectedRowKeys } = props;
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={props.data} />
    );
}

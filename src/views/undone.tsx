/* eslint-disable react/prop-types */
import React from "react";
import { Divider, Table, Form, InputNumber, Input, Popconfirm as PopConfirm, Typography, Button } from "antd";


interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
}
const originData: Item[] = [];

for (let i = 0; i < 5; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
    });
} interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    // eslint-disable-next-line react/prop-types
    dataIndex,
    title,
    inputType,
    // eslint-disable-next-line no-unused-vars
    record,
    // eslint-disable-next-line no-unused-vars
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ?
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`
                        }
                    ]}
                >
                    {inputNode}
                </Form.Item> :
                children
            }
        </td>
    );
};

export default class Undone extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: originData,
            editingKey: "",
            form: React.createRef()
        };

    }

    columns = [
        {
            title: "name",
            dataIndex: "name",
            width: "25%",
            editable: true
        },
        {
            title: "age",
            dataIndex: "age",
            width: "15%",
            editable: true
        },
        {
            title: "address",
            dataIndex: "address",
            width: "40%",
            editable: true
        },
        {
            title: "operation",
            dataIndex: "operation",
            render: (_: any, record: Item) => {
                const editable = this.isEditing(record);

                return editable ?
                    <span>
                        <Button type="link" onClick={() => this.save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Button>
                        <PopConfirm title="暂时取消修改?" onConfirm={this.cancel}>
                            <Button type="link">Cancel</Button>
                        </PopConfirm>
                    </span> :
                    <Typography.Link disabled={this.state.editingKey !== ""} onClick={() => this.edit(record)}>
                        Edit
                    </Typography.Link>
                    ;
            }
        }
    ];
    mergedColumns = this.columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record)
            })
        };
    });

    isEditing = (record: Item) => record.key === this.state.editingKey;
    edit = (record: Partial<Item> & { key: React.Key }) => {
        this.state.form.current.setFieldsValue({ name: "", age: "", address: "", ...record });
        console.log(record);
        this.setState({
            editingKey: record.key
        });
    };
    cancel = () => {
        this.setState({
            editingKey: ""
        });
    }
    save = async (key: React.Key) => {
        try {
            const row = (await this.state.form.current.validateFields()) as Item;

            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];

                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                this.setState({
                    editingKey: "",
                    data: newData
                });
            } else {
                newData.push(row);
                this.setState({
                    editingKey: "",
                    data: newData
                });
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };
    render() {
        console.log(this.mergedColumns);
        console.log(this.state.data);
        return (
            <div>
                <Divider orientation="left">未完成的任务</Divider>
                <Form ref={this.state.form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell
                            }
                        }}
                        bordered
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel
                        }}
                        columns={this.mergedColumns}
                        dataSource={this.state.data} />
                </Form>
            </div>
        );
    }
}

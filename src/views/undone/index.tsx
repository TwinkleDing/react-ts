/* eslint-disable react/prop-types */
import React from "react";
import {
    Divider,
    Table,
    Form,
    InputNumber,
    Input,
    Popconfirm as PopConfirm,
    Typography,
    Button,
    Checkbox,
    Image
} from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { EditableCellProps, UndoneItem } from "@/interface";
import ChartTab from "@/components/ChartTab";
import Kirby from "@/assets/Kirby.jpg";
import Zelda from "@/assets/Zelda.webp";
import Pokemon from "@/assets/Pokemon.webp";
import style from "@/css/modules/undone.module.scss";

const originData: UndoneItem[] = [];

for (let i = 0; i < 2; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
    });
}
const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
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

class Undone extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: originData,
            editingKey: "",
            form: React.createRef()
        };
    }

    option: any = {
        polar: {
            radius: [10, "70%"]
        },
        radiusAxis: {
            max: 100
        },
        angleAxis: {
            type: "category",
            data: ["react", "redux", "axios", "webpack", "ant-design"],
            startAngle: 75
        },
        tooltip: {},
        series: {
            type: "bar",
            data: [{
                value: 95,
                itemStyle: {
                    color: "#ee6666"
                }
            },
            {
                value: 85,
                itemStyle: {
                    color: "#fac858"
                }
            },
            {
                value: 90,
                itemStyle: {
                    color: "#91cc75"
                }
            },
            {
                value: 75,
                itemStyle: {
                    color: "#5470c6"
                }
            },
            {
                value: 80,
                itemStyle: {
                    color: "#73c0de"
                }
            }],
            coordinateSystem: "polar",
            label: {
                show: true,
                position: "middle",
                formatter: "{c}"
            }
        },
        backgroundColor: "#fff",
        animation: true
    };

    columns: any = [
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
            render: (_: any, record: UndoneItem) => {
                const editable = this.isEditing(record);

                return editable ?
                    <span>
                        <Button
                            type="link"
                            onClick={() => this.save(record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </Button>
                        <PopConfirm
                            title="暂时取消修改?"
                            onConfirm={this.cancel}
                        >
                            <Button type="link">Cancel</Button>
                        </PopConfirm>
                    </span> :
                    <span>
                        <Typography.Link
                            disabled={this.state.editingKey !== ""}
                            onClick={() => this.edit(record)}
                        >
                            Edit
                        </Typography.Link>
                        <Button
                            type="link"
                            onClick={() => this.save(record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Over
                        </Button>
                    </span>
                    ;
            }
        }
    ];

    mergedColumns: any = this.columns.map((col: any) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: UndoneItem) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record)
            })
        };
    });

    isEditing = (record: UndoneItem) => record.key === this.state.editingKey;
    edit = (record: Partial<UndoneItem> & { key: React.Key }) => {
        this.state.form.current.setFieldsValue({
            name: "",
            age: "",
            address: "",
            ...record
        });
        this.setState({
            editingKey: record.key
        });
    };

    cancel = () => {
        this.setState({
            editingKey: ""
        });
    };

    save = async (key: React.Key) => {
        try {
            const row =
                (await this.state.form.current.validateFields()) as UndoneItem;
            const newData = [...this.state.data];
            const index = newData.findIndex((item) => key === item.key);

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
        return (
            <div className={style.undone}>
                <Divider orientation="left">待完成的任务</Divider>
                <Form ref={this.state.form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell
                            }
                        }}
                        bordered
                        rowClassName={style["editable-row"]}
                        pagination={{
                            hideOnSinglePage: true,
                            onChange: this.cancel
                        }}
                        columns={this.mergedColumns}
                        dataSource={this.state.data}
                    />
                </Form>
                <div className={style["undone-tab"]}>
                    <TodoList />
                    <div>
                        <Divider orientation="left">掌握技能</Divider>
                        <ChartTab option={this.option} renderer="svg" />
                    </div>
                    <div>
                        <Divider orientation="left">期待的游戏</Divider>
                        <LookingGames />
                    </div>
                </div>
            </div>
        );
    }
}
interface TodoListItem {
    title: string;
    status: number;
}
class TodoList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            listData: [
                {
                    title: "star this repository",
                    status: 0
                },
                {
                    title: "fork this repository",
                    status: 0
                },
                {
                    title: "follow author",
                    status: 0
                },
                {
                    title: "react",
                    status: 1
                },
                {
                    title: "redux & react-hock",
                    status: 1
                },
                {
                    title: "ant-design",
                    status: 1
                },
                {
                    title: "axios",
                    status: 1
                },
                {
                    title: "webpack",
                    status: 1
                }
            ]
        };
    }
    onChange(e: any, index: number) {
        let list = this.state.listData;

        list[index].status = e.target.checked ? 1 : 0;
        this.setState({
            listData: list
        });
    }
    removeItem(index: number) {
        let list = this.state.listData;

        list.splice(index, 1);
        this.setState({
            listData: list
        });
    }
    list() {
        return this.state.listData.map((item: TodoListItem, index: number) => {
            return (
                <div className={style["todo-item"]} key={index}>
                    <Checkbox
                        checked={item.status === 1}
                        className={item.status === 1 ? style["todo-active"] : style["not-active"]}
                        onChange={(e) => this.onChange(e, index)}
                    >
                        {item.title}
                    </Checkbox>
                    <span onClick={() => this.removeItem(index)}>
                        <MinusCircleOutlined />
                    </span>
                </div >
            );
        });
    }
    render() {
        return (
            <div className={style["todo-list"]}>
                <Divider orientation="left">待办事项</Divider>
                {this.list()}
            </div >
        );
    }
}

interface GameItem {
    name: string;
    price: number;
    platform: string;
    time: string;
    img: any
}


class LookingGames extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            gameList: [
                {
                    name: "星之卡比-探索发现",
                    price: 325,
                    platform: "switch",
                    time: "2022-03-25",
                    img: Kirby
                },
                {
                    name: "塞尔达-旷野之息2",
                    price: 375,
                    platform: "switch",
                    time: "2022-12-25",
                    img: Zelda
                },
                {
                    name: "宝可梦朱紫",
                    price: 355,
                    platform: "switch",
                    time: "2022-12-20",
                    img: Pokemon
                }
            ]
        };
    }
    list() {
        return this.state.gameList.map((item: GameItem, index: number) => {
            return <div className={style["games-item"]} key={index}>
                <Image
                    width={80}
                    height={80}
                    src={item.img}
                    preview={false}
                    alt="" />
                <div>
                    <div className={style["games-title"]}>{item.name}</div>
                    <div>发行价格：<b>{item.price}</b></div>
                    <div>发行平台：<b>{item.platform}</b></div>
                    <div>发行时间：<b>{item.time}</b></div>
                </div>
            </div >;
        });
    }
    render() {
        return <div className={style["looking-games"]}>{this.list()}</div>;
    }
}
export default Undone;

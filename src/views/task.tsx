import React from "react";
import { Tag, Divider, Radio } from "antd";

export default class Task extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            radioValue: ""
        };
    }
    onChange4 = (e: any) => {
        console.log("radio4 checked", e.target.value);
        this.setState({
            radioValue: e.target.value
        });
    };
    render() {
        return (
            <div className="task">
                <Divider orientation="left">任务模板</Divider>
                <TemplateList />
                <Divider orientation="left">新建任务</Divider>
                <div className="task-new">
                    <div className="task-preset">
                        <div className="task-preset-title">预制任务</div>
                        <Radio.Group
                            className="task-preset-content"
                            options={optionsWithDisabled}
                            onChange={this.onChange4}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </div>
                    <div>自定义任务</div>
                </div>
            </div>
        );
    }
}

function TemplateList() {
    return (
        <div>
            {
                templateList.map(item =>
                    <Tag key={item.id} color="#108ee9">{item.name}</Tag>
                )
            }
        </div>
    );
}
const optionsWithDisabled = [
    { label: "工时统计", value: "Apple" },
    { label: "EHS", value: "Pear" }
];

const templateList = [
    {
        name: "任务模板",
        id: 1
    },
    {
        name: "任务模板",
        id: 2
    },
    {
        name: "任务模板",
        id: 3
    },
    {
        name: "任务模板",
        id: 4
    },
    {
        name: "任务模板",
        id: 5
    },
    {
        name: "任务模板",
        id: 6
    },
    {
        name: "任务模板",
        id: 7
    }
];

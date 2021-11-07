import React from "react";
import { Tag, Divider, Radio, Upload, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

export default class Task extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            radioValue: "workTime"
        };
    }
    presetChange = (e: any) => {
        console.log("radio4 checked", e.target.value);
        this.setState({
            radioValue: e.target.value
        });
    };
    presetConfirm = () => {
        console.log(this.state.radioValue);
    }
    render() {
        const props = {
            name: "file",
            multiple: true,
            accept: ".xsl,.xlsx",
            maxCount: 1,
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            onChange(info: any) {
                const { status } = info.file;

                if (status !== "uploading") {
                    console.log(info.file, info.fileList);
                }
                if (status === "done") {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            onDrop(e: any) {
                console.log("Dropped files", e.dataTransfer.files);
            }
        };

        return (
            <div className="task">
                <Divider orientation="left">任务模板</Divider>
                <TemplateList dataList={templateList} />
                <Divider orientation="left">新建任务</Divider>
                <div className="task-new">
                    <div className="task-preset">
                        <div className="task-preset-title">预制任务</div>
                        <Radio.Group
                            className="task-preset-content"
                            options={optionsWithDisabled}
                            onChange={this.presetChange}
                            value={this.state.radioValue}
                            optionType="button"
                            buttonStyle="solid"
                        />
                        <div className="task-preset-btn">
                            <Button onClick={this.presetConfirm} type="primary">确定</Button>
                        </div>
                    </div>
                    <div className="task-custom">
                        <div className="task-custom-title">自定义任务</div>
                        <div className="task-custom-content">
                            <Dragger className="task-custom-upload" {...props}>
                                <p className="ant-upload-text">单击或拖动文件到此区域以上载</p>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                            </Dragger>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function TemplateList(props: any) {
    let templateClick = (templateId: number) => {
        console.log(templateId);
    };

    return (
        <div>
            {
                props.dataList.map((item: any) =>
                    <Tag
                        onClick={() => templateClick(item.id)}
                        key={item.id}
                        color="#108ee9">
                        {item.name}
                    </Tag>
                )
            }
        </div>
    );
}

const optionsWithDisabled = [
    { label: "工时统计", value: "workTime" },
    { label: "EHS", value: "EHS" }
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

import React from "react";
import { Tag, Divider, Radio, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

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
                    <div className="task-custom">
                        <div className="task-custom-title">自定义任务</div>
                        <div className="task-custom-content">
                            <Dragger className="task-custom-upload" {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">单击或拖动文件到此区域以上载</p>
                            </Dragger>
                        </div>
                    </div>
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

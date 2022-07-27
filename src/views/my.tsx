import React, { useState, useEffect } from "react";
import store from "@/store/index";
import MyApi from "@/api/my";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import ImgCrop from "antd-img-crop";
import {
    Button,
    Input,
    Form,
    InputNumber,
    Radio,
    Upload,
    Select
} from "antd";
const token: string = store.getState()?.token?.value || "";

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
};

const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const My: React.FC = () => {
    const [info, setInfo] = useState<any>({
        userName: "",
        userId: "",
        department: "",
        position: ""
    });

    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
    ]);

    useEffect(() => {
        const userId = store.getState()?.userInfo.value.userId;

        MyApi.getInfo({ userId }).then((res: any) => {
            setInfo({ ...res.data });
        });
    }, []);

    const onFinish = (values: any) => {
        console.log("Received values of form: ", values);
    };
    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;

        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();

                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();

        image.src = src;
        const imgWindow = window.open(src);

        imgWindow?.document.write(image.outerHTML);
    };


    return (
        <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={info}
        >
            <Form.Item
                name="userName"
                label="姓名"
                rules={[
                    {
                        required: true,
                        message: "请输入姓名!"
                    }
                ]}
            >
                <Input placeholder="请输入姓名!" />
            </Form.Item>

            <Form.Item name="age" label="年龄" rules={[{ required: true, message: "请输入年龄!" }]}>
                <InputNumber min={1} />
            </Form.Item>

            <Form.Item name="sex" label="性别" rules={[{ required: true, message: "请选择性别!" }]}>
                <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="0">女</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="position"
                label="职位"
                rules={[{ required: true, message: "请选择职位!" }]}
            >
                <Select placeholder="请选择职位!">
                    <Option value="1">前端</Option>
                    <Option value="2">后端</Option>
                    <Option value="3">开发</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="department"
                label="部门"
                rules={[{ required: true, message: "请选择部门!" }]}
            >
                <Select placeholder="请选择部门!">
                    <Option value="1">Red</Option>
                    <Option value="2">Green</Option>
                    <Option value="3">Blue</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="头像"
            >
                <ImgCrop rotate>
                    <Upload
                        action="http://localhost:3333/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        headers={{
                            "Authorization": token
                        }}
                    >
                        {fileList.length < 2 && "+ Upload"}
                    </Upload>
                </ImgCrop>
            </Form.Item>


            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    );
};

export default My;

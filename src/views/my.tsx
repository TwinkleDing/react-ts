import React, { useState, useEffect } from "react";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import ImgCrop from "antd-img-crop";
import {
    Button,
    Input,
    Form,
    InputNumber,
    Radio,
    Upload,
    Select,
    Modal,
    message
} from "antd";
import store from "@/store/index";
import MyApi from "@/api/modules/MyApi";
import { getBase64 } from "@/utils/tools";

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
    const token: string = store.getState()?.token?.value || "";
    const [form] = Form.useForm();
    const [userId] = useState(store.getState()?.userInfo?.value.userId);

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const handleCancel = () => setPreviewVisible(false);

    useEffect(() => {
        // 获取我的信息
        MyApi.getInfo({ userId }).then((res: any) => {
            form.setFieldsValue(res.data);
            setFileList([res.data.avatar]);
        });
    }, []);

    // 表格提交事件
    const onFinish = (values: any) => {
        const params = { ...values, userId };

        MyApi.update(params).then((res: any) => {
            if (res.status === 200) {
                const user = {
                    type: "USER_INFO",
                    value: res.data
                };

                store.dispatch(user);
                message.success(res.msg);
            } else {
                message.error(res.msg);
            }
        });
    };

    // 图片上传事件
    const onChange: UploadProps["onChange"] = (res) => {
        setFileList(res.fileList);
        if (res.file.status === "done" && res.file.response?.code === 200) {
            form.setFieldsValue({ ...form, avatar: res.file.response.data });
        }
    };

    // 图片预览
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || file.preview as string);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };


    return (
        <Form
            form={form}
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
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
                    <Option value="1">产品部</Option>
                    <Option value="2">研发部</Option>
                    <Option value="3">测试部</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="avatar"
                label="头像"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <ImgCrop rotate>
                    <Upload
                        action="http://localhost:3333/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={handlePreview}
                        headers={{
                            "Authorization": token
                        }}
                    >
                        {fileList.length < 1 && "+ Upload"}
                    </Upload>
                </ImgCrop>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            {/* 图片预览的模态窗 */}
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </Form >
    );
};

export default My;

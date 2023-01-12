import React, { useState, useEffect } from "react";
import {
	Divider,
	Table,
	Space,
	message,
	Popconfirm,
	Input,
	Button,
	Modal,
	Form,
	Select,
	Radio,
	InputNumber
} from "antd";
import type { ColumnsType } from "antd/es/table";
import ManagementApi from "@/api/modules/ManagementApi";
import style from "@/css/modules/management.module.scss";
const { Search } = Input;
const { Option } = Select;
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 }
};

interface DataType {
	key: React.Key;
	userName: string;
	age: string;
	sex: string;
	departmentName: number;
	positionName: string;
}

const Management: React.FC = () => {
	const [userList, setUserList] = useState([]);
	const [recond, setRecond] = useState({ userId: "" });
	const [edit, setEdit] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	// 当[]监听的值发生改变，去执行里面的方法
	useEffect(() => {
		// 获取用户列表
		getList();
	}, [searchValue]);

	const onSearch = (value: string) => {
		setSearchValue(value);
	};

	const getList = () => {
		ManagementApi.getUserList({
			userName: searchValue
		}).then((res: any) => {
			res.data.map((item: any) => {
				item.key = item.userId;
			});
			setUserList(res.data);
		});
	};

	const openNewUser = () => {
		setEdit(false);
		setIsModalVisible(true);
		form.resetFields();
	};

	const handleOk = () => {
		form.submit();
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onFinish = (values: any) => {
		const params = { ...values };

		if (!edit) {
			ManagementApi.addUser(params).then((res: any) => {
				if (res.code === 200) {
					message.success(res.msg);
					handleCancel();
					getList();
				} else {
					message.error(res.msg);
				}
			});
		} else {
			params.userId = recond.userId;
			ManagementApi.updateUser(params).then((res: any) => {
				if (res.code === 200) {
					message.success(res.msg);
					handleCancel();
					getList();
				} else {
					message.error(res.msg);
				}
			});
		}
	};

	const columns: ColumnsType<DataType> = [
		{
			title: "姓名",
			dataIndex: "userName",
			key: "userName"
		},
		{
			title: "年龄",
			dataIndex: "age",
			key: "age"
		},
		{
			title: "性别",
			dataIndex: "sex",
			key: "sex",
			// eslint-disable-next-line react/display-name
			render: (_, record) =>
				<Space size="middle">{record.sex === "1" ? "男" : record.sex === "0" ? "女" : ""}</Space>

		},
		{
			title: "部门",
			dataIndex: "departmentName",
			key: "departmentName"
		},
		{
			title: "职位",
			dataIndex: "positionName",
			key: "positionName"
		},
		{
			title: "操作",
			key: "action",
			width: "200px",
			// eslint-disable-next-line react/display-name
			render: (_, record) =>
				<Space size="middle">
					<a onClick={() => editBtn(record)}>修改</a>
					<div>{deleteBtn(record)}</div>
				</Space>

		}
	];

	const editBtn = (record: any) => {
		setRecond(record);
		setEdit(true);
		setIsModalVisible(true);
		form.setFieldsValue(record);
	};

	const deleteBtn = (record: any) =>
		<Popconfirm title="确定删除此人员么?" onConfirm={() => deleteUser(record)} okText="确定" cancelText="取消">
			<a href="#">删除</a>
		</Popconfirm>

	;

	const deleteUser = (record: any) => {
		message.success("删除成功！");
		console.log(record);
	};

	return (
		<div>
			<Divider orientation="left">人员管理</Divider>
			<div className={style.handle}>
				<Search
					className={style.searchInput}
					placeholder="请输入姓名搜索"
					allowClear
					enterButton="搜索"
					onSearch={onSearch}
				/>
				<Button onClick={openNewUser} type="primary">
					新建
				</Button>
			</div>
			<Table className={style.table} dataSource={userList} columns={columns} />
			<Modal
				title="新建人员"
				visible={isModalVisible}
				maskClosable={false}
				destroyOnClose={true}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} name="validate_other" {...formItemLayout} onFinish={onFinish}>
					{!edit &&
						<Form.Item
							name="userId"
							label="账号"
							rules={[
								{
									required: true,
									message: "请输入账号!"
								}
							]}
						>
							<Input placeholder="请输入账号!" />
						</Form.Item>
					}
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

					<Form.Item name="position" label="职位" rules={[{ required: true, message: "请选择职位!" }]}>
						<Select placeholder="请选择职位!">
							<Option value="1">前端</Option>
							<Option value="2">后端</Option>
							<Option value="3">开发</Option>
						</Select>
					</Form.Item>

					<Form.Item name="department" label="部门" rules={[{ required: true, message: "请选择部门!" }]}>
						<Select placeholder="请选择部门!">
							<Option value="1">产品部</Option>
							<Option value="2">研发部</Option>
							<Option value="3">测试部</Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default Management;

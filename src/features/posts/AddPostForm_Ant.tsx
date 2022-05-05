import { nanoid } from "@reduxjs/toolkit";
import { Button, Form, Input, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
// import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";

type TForm = {
  title: string;
  content: string;
  select: string;
  password: string;
  confirm: string;
};

export const AddPostForm_Ant = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm<TForm>();

  const onSavePostClicked = (values: TForm) => {
    console.log("values", values);
    dispatch(
      postAdded({
        id: nanoid(),
        title: values.title,
        content: values.content,
      })
    );
  };

  const fillForm = () => {
    form.setFieldsValue({
      content: "content",
      select: "demo",
      title: "title",
      password: "aaa",
      confirm: "aaa",
    });
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <Form
        onFinish={onSavePostClicked}
        form={form}
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
      >
        <Form.Item
          label="Post Title"
          name="title"
          rules={[{ required: true, message: "Please input post title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please input post content!" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Select"
          name="select"
          rules={[{ required: true, message: "Please input select content!" }]}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                console.log("value", value);
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Save Post
          </Button>
          <Button onClick={() => form.resetFields()}>Reset Form</Button>
          <Button onClick={() => fillForm()}>Fill Form</Button>
        </Space>
      </Form>
    </section>
  );
};

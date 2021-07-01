import { Modal, Form, InputNumber, Select, DatePicker, Input } from 'antd';

const { Option } = Select;

const RecordModal = ({ addRecordVisible, setAddRecordVisible, confirmLoading, setConfirmLoading, onAddRecord, me, members }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then((values) => {
            form.resetFields();
            onAddRecord(values.record);
            setConfirmLoading(true);
            setTimeout(() => {
                setAddRecordVisible(false);
                setConfirmLoading(false);
            }, 1000);
        }).catch((e) => { console.log("e = ", e) });
    };
    const handleCancle = () => {
        setAddRecordVisible(false);
        form.resetFields();
    }
    const handleSelectChange = (value) => {
        console.log(`selected ${value}`);
    }

    const options = [];
    for (let i = 0; i < members.length; i++) {
        const value = members[i];
        options.push({ value });
    }

    return (
        <Modal
            title="Add Record"
            visible={addRecordVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancle}
        >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                form={form}
            >
                <Form.Item 
                    name={['record', 'name']}
                    label="Record Name"
                    rules={[{ required: true, message: "Record name is required." }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name={['record', 'value']}
                    label="Price"
                    rules={[{ required: true, message: "Price is required." }]}
                >
                    <InputNumber min={0}/>
                </Form.Item>
                <Form.Item 
                    name={['record', 'lender']}
                    label="Paid By"
                    rules={[{ required: true, message: "This column is required." }]}
                >
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleSelectChange}
                        options={options}
                    />
                </Form.Item>

                <Form.Item 
                    name={['record', 'borrowers']}
                    label="Splited By"
                    rules={[{ required: true, message: "This column is required." }]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleSelectChange}
                        options={options}
                    />
                </Form.Item>
                <Form.Item 
                    name={['record', 'date']}
                    label="Date"
                    rules={[{ required: true, message: "Date is required." }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item 
                    name={['record', 'description']}
                    label="Description"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );

}

export default RecordModal;
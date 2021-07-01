import { useState } from 'react';
import { Collapse, Space, Empty, Button, Modal } from 'antd';

import RecordModal from './RecordModal';

const { Panel } = Collapse;

const Record = ({ isAll, records }) => {
    const [addRecordVisible, setAddRecordVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleBalance = () => {
        Modal.info({
            title: 'Balance',
            //TODO: calculate balance and show in content here
            content: (
              <div>
                <p>some messages...some messages...</p>
              </div>
            ),
            onOk() {},
        });
    }
    
    return (
        <>
            {(records.length == 0)? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Records">
                    <Button type="primary" onClick={() => { setAddRecordVisible(true); }}>Add Record</Button>
                    <RecordModal 
                        addRecordVisible={addRecordVisible}
                        setAddRecordVisible={setAddRecordVisible}
                        confirmLoading={confirmLoading}
                        setConfirmLoading={setConfirmLoading}
                    />
                </Empty> 
            ):(
                <Space direction="vertical">
                    <Space>
                        <Button type="primary" onClick={() => { setAddRecordVisible(true); }}>Add Record</Button>
                        <RecordModal 
                            addRecordVisible={addRecordVisible}
                            setAddRecordVisible={setAddRecordVisible}
                            confirmLoading={confirmLoading}
                            setConfirmLoading={setConfirmLoading}
                            onAddRecord={onAddRecord}
                        />

                        <Button onClick={handleBalance}>Balance</Button>
                    </Space>
                    <br/>
                    {records.map(({ name, description, value, lender, borrowers }) => {
                        return (
                            <Collapse style={{ width: 800 }}>
                                <Panel header={name}>
                                    <p className="record-text-title">Price</p>
                                    <p className="record-text-data">  {value}</p>
                                    <br />
                                    <br />
                                    <p className="record-text-title">Lender</p>
                                    <p className="record-text-data">  {lender}</p>
                                    <br />
                                    <br />
                                    <p className="record-text-title">Borrowers</p>
                                    <p className="record-text-data">  Edward</p>
                                    <br />
                                    <br />
                                    <p className="record-text-title">Description</p>
                                    <p className="record-text-data">  {description}</p>
                                </Panel>
                            </Collapse>
                        );
                    })}
                    
                </Space> 
            )}
        </>        
    );
};

export default Record;

{/* <Collapse defaultActiveKey={['1']} style={{ width: 800 }}>
    <Panel header="某某" key="1">
        <p>Price: 250</p>
        <p>Lender: Michelle</p>
        <p>Borrowers: Edward</p>
        <p>Description: bla bla bla</p>
    </Panel>
</Collapse>
<Collapse collapsible="disabled">
    <Panel header="This panel can't be collapsed" key="1">
        <p>Hello</p>
    </Panel>
</Collapse> */}
import "../App.css"

import { useState, useEffect} from "react"; 
import { Menu, Card, Avatar, Col, Row, Collapse, Space, Empty, Button, Modal, Popconfirm } from 'antd';
import { UserOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';

import useRoom from "../hook/useRoom";
import RecordModal from "../Components/RecordModal";

const { SubMenu } = Menu;
const { Meta } = Card;
const { Panel } = Collapse;

const rootSubmenuKeys = ['sub1'];
const image_src = ['https://i.imgur.com/gl319o2.jpg', 'https://i.imgur.com/medAMil.jpg', 'https://i.imgur.com/tDJQRQt.jpg', 'https://i.imgur.com/HOtbE58.png', 'https://i.imgur.com/f5Bi8AB.png'];

const Room = ({ me, room, server }) => {
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const [addRecordVisible, setAddRecordVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [memberVisible, setMemberVisible] = useState("none");
    const [recordVisible, setRecordVisible] = useState("none");
    const [allRecordVisible, setAllRecordVisible] = useState("none");
    const [myRecordVisible, setMyRecordVisible] = useState("none");


    const [clearVisible, setClearVisible] = useState(false);
    const [clearConfirmLoading, setClearConfirmLoading] = useState(false);
    
    const [all, setAll] = useState(true);
    const { members, records, balance, getBalance, queryMember, queryRecord, addRecord, clearAllRecord, deleteRecord, doBalance, onServerEvent, setGetBalance } = useRoom();

    // console.log(me);

    server.onmessage = (m) => {
        onServerEvent(JSON.parse(m.data), me);
    };

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const allMemberOnClick = () => {
        queryMember(server, room);
        setMemberVisible("inline");
        setRecordVisible("none");
        setAllRecordVisible("none");
        setMyRecordVisible("none");
    }

    const allRecordOnClick = () => {
        queryMember(server, room);
        queryRecord(server, room);
        setMemberVisible("none");
        setRecordVisible("inline");
        setAllRecordVisible("inline");
        setMyRecordVisible("none")
        setAll(true);
        //doBalance(server, room);
    }
    const myRecordOnClick = () => {
        queryMember(server, room);
        queryRecord(server, room);
        setMemberVisible("none");
        setRecordVisible("inline");
        setAllRecordVisible("none");
        setMyRecordVisible("inline")
        setAll(false);
        //doBalance(server, room);
    }

    const onAddRecord = (record) => {
        queryMember(server, room);
        addRecord(server, room, record);
        //doBalance(server, room);
    }

    const handleBalance = () => {
        queryRecord(server, room);
        doBalance(server, room);
    }
    useEffect(() => {
        if(getBalance){
            console.log("show balance");
            console.log(balance)
            if (balance.length > 0) {
                Modal.info({
                    title: 'Balance',
                    content: (
                    <div>
                        {balance.map((item) => {
                            return (
                                <p>{item}</p>
                            );
                        })}
                    </div>
                    ),
                    onOk() {},
                });
            } else {
                Modal.info({
                    title: 'Balance',
                    content: (
                        <p>You are balanced.</p>
                    ),
                    onOk() {},
                });
            }
            setGetBalance(false);
        }
    }, [getBalance]);
    const handleOk = () => {
        setClearConfirmLoading(true);
        setTimeout(() => {
            setClearVisible(false);
            setClearConfirmLoading(false);
        }, 1000);
        clearAllRecord(server, room);
    };
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setClearVisible(false);
    };

    const genExtra = (id) => (
        <DeleteOutlined
            onClick={event => {
                event.stopPropagation();
                deleteRecord(server, room, id);
            }}
        />
    );

    const myRecord = [] 
    for (let i = 0; i < records.length; i++) {
        if (records[i].lender === me) {
            myRecord.push(records[i]);
            continue;
        }
        var pick = false;
        for (let j = 0; j < records[i].borrower.length; j++) {
            if (records[i].borrower[j] === me) {
                myRecord.push(records[i]);
                pick = true;
                break;
            }
        }
        if (pick)
            continue;
    }

    return (
        <>
            <div className="room-header">
                <div className="room-title"><p>Room {room}</p></div>
                <div > 
                    <p className="profile">{me}</p>
                    <p>  </p>
                    <Avatar className="profile" src={image_src[me.length % 5]} />
                </div>
                
      
            </div>

            <div className="room-sider">
                <Menu 
                    mode="inline" 
                    openKeys={openKeys} 
                    onOpenChange={onOpenChange} 
                >
                    <Menu.Item key="1" icon={<UserOutlined />} onClick={allMemberOnClick}>
                        Room Members
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="Records">
                        <Menu.Item key="2" onClick={allRecordOnClick}>All Records </Menu.Item>
                        <Menu.Item key="3" onClick={myRecordOnClick}>My Records</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
            
            <div className="room-content">
                <div style={{display: memberVisible}}> 
                    <Row gutter={16}>
                        {members.map((item) => {
                            return (
                                <Col span={8}>
                                    <Card className="member" style={{ width: 300, marginTop: 16 }}>
                                        <Meta
                                            avatar={
                                                <Avatar src={image_src[item.length % 5]} />
                                            }
                                            title={item}
                                            description={`A member of room ${room}.`}
                                        />
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </div>

                <div style={{display: recordVisible}}>
                    <Space direction="vertical">
                        <Space>
                            <Button type="primary" onClick={() => { setAddRecordVisible(true); }}>Add Record</Button>
                            <RecordModal 
                                addRecordVisible={addRecordVisible}
                                setAddRecordVisible={setAddRecordVisible}
                                confirmLoading={confirmLoading}
                                setConfirmLoading={setConfirmLoading}
                                onAddRecord={onAddRecord}
                                members={members}
                            />

                            <Button onClick={handleBalance}>Balance</Button>

                            <Popconfirm
                                title="Are you sure you want to clear all records?"
                                visible={clearVisible}
                                onConfirm={handleOk}
                                okButtonProps={{ loading: clearConfirmLoading }}
                                onCancel={handleCancel}
                            >
                                <Button danger onClick={() => {setClearVisible(true)}}>
                                    Clear All Record
                                </Button>
                            </Popconfirm>
                        </Space>
                    </Space> 
                    
                    <div style={{display: allRecordVisible}}> 
                        {(records.length == 0)? (
                            <Empty style={{float: "center"}} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Records"></Empty>
                        ):(
                            <Space direction="vertical" size="middle">
                                <br/>
                                {records.map(({ id, name, description, value, lender, borrower, date }) => {
                                    return (
                                        <Collapse style={{ width: 800 }}>
                                            <Panel header={name} extra={genExtra(id)}>
                                                <p className="record-text-title">Price:</p>
                                                <p className="record-text-data">  {value}</p>
                                                <br />
                                                <br />
                                                <p className="record-text-title">Paid by:</p>
                                                <p className="record-text-data">  {lender}</p>
                                                <br />
                                                <br />
                                                <p className="record-text-title">Splited by:</p>
                                                {borrower.map((item, index) => {
                                                    return (index == 0) ? (
                                                        <p className="record-text-data"> {item}</p>
                                                    ):(
                                                        <p className="record-text-data"> ,  {item}</p>
                                                    )
                                                })}
                                                <br />
                                                <br />
                                                <p className="record-text-title">Date:</p>
                                                <p className="record-text-data">  {date}</p>
                                                <br />
                                                <br />
                                                <p className="record-text-title">Description:</p>
                                                <p className="record-text-data">  {description}</p>
                                            </Panel>
                                        </Collapse>
                                    );
                                })}
                            </Space>
                        )}
                    </div>
                
                    <div style={{display: myRecordVisible}}> 
                        {(myRecord.length == 0)? (
                            <Empty style={{float: "center"}} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Records"></Empty>
                        ):(
                            <Space direction="vertical" size="middle">
                                <br/>
                                {myRecord.map(({ id, name, description, value, lender, borrower, date }) => {
                                    return (
                                        <Collapse style={{ width: 800 }}>
                                            <Panel header={name} extra={genExtra(id)}>
                                                <p className="record-text-title">Price</p>
                                                <p className="record-text-data">  {value}</p>
                                                <br />
                                                <br />
                                                <p className="record-text-title">Paid by</p>
                                                <p className="record-text-data">  {lender}</p>
                                                <br />
                                                <br />
                                                <p className="record-text-title">Splited by</p>
                                                {borrower.map((item) => {
                                                    return (
                                                        <p className="record-text-data">  {item} </p>
                                                    )
                                                })}
                                                <br />
                                                <br />
                                                <p className="record-text-title">Date</p>
                                                <p className="record-text-data">  {date}</p>
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
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Room;

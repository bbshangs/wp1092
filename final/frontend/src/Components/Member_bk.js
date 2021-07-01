import '../App.css';
import { Space, Card, Avatar, Col, Row } from 'antd';
import { useEffect  } from 'react';
// import useMember from '../hook/useMember';
// import useRoom from '../hook/useRoom';

const { Meta } = Card;

const Member = ({ room, members }) => {
    const image_src = ['https://i.imgur.com/gl319o2.jpg', 'https://i.imgur.com/medAMil.jpg', 'https://i.imgur.com/tDJQRQt.jpg', 'https://i.imgur.com/HOtbE58.png', 'https://i.imgur.com/f5Bi8AB.png'];
    // const { members } = useRoom();

    // console.log(members)
    // useEffect(() => {}, [members]);

    return (
        <>
            <Row gutter={16}>
                
            {members.map((item) => {
                return (
                    <Col span={8}>
                        <Card style={{ width: 300, marginTop: 16 }}>
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
        </>
    );
};

export default Member;
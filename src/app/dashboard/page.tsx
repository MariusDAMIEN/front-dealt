
'use client'

import React, { useEffect, useState } from 'react';
import {
    PlusOutlined,
} from '@ant-design/icons';
import { Layout, theme, Row, Col, FloatButton, Modal, Input, Form, Space, notification, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TestForm from '@/components/UpdateModalForm';
import type { SelectProps } from 'antd';
import HeaderComponent from '@/components/HeaderComponent';
import CardItem from '@/components/CardItem';

import type { Card, Tag } from 'dashboard'



const { Content } = Layout;


const App: React.FC = () => {
    const {
        token: { borderRadiusLG },
    } = theme.useToken();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isModalViewOpen, setModalViewOpen] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [form] = Form.useForm();
    const [tags, setTags] = useState<Tag[]>([]);
    const [api, contextHolder] = notification.useNotification();

    type NotificationType = 'success' | 'info' | 'warning' | 'error';
    const options: SelectProps['options'] = [];

    for (let i = 0; i < tags.length; i++) {
        options.push(
            {
                label: tags[i].title,
                value: tags[i].title,
            }
        );
    }


    const session = useSession();
    const router = useRouter();


    useEffect(() => {

        if (session.status === "unauthenticated") {
            router?.push("/");
        }
        const getData = async () => {
            if (session.data != null) {
                const query = await fetch('http://127.0.0.1:3001/notes/' + session.data.user.id, {
                },);
                const response = await query.json();
                setCards(response);
                setFilteredCards(response);
            }
        }


        getData();
        // getTag();
    }, [session.status]);


    const searchInCards = (searchText: string) => {
        const filteredCardsUpdt = cards.filter((card) =>
            card.title.toLowerCase().includes(searchText.toLowerCase()) ||
            card.message.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredCards(filteredCardsUpdt);
    }


    const showModal = () => {
        setIsModalOpen(true);
    };
    const onChange = () => {
    };

    const openNotificationWithIcon = (type: NotificationType) => {

        api[type]({
            message: type == 'success' ? "La note a était ajouté avec succès !" : type == 'error' ? "Une Erreur c'est produite" : " default",
        });
    };

    const handleChange = () => {
    };
    const handleOk = async () => {
        setIsModalOpen(false);
        form
            .validateFields({ validateOnly: true })
            .then(async (values) => {
                values.user = session.data?.user.id

                const tagsToUpdt: { title: string }[] = [];

                if (values.tags) {

                    values.tags.map((value: any) => {
                        tagsToUpdt.push({ title: value });
                    });

                    values.tags = tagsToUpdt;
                }
                form.resetFields();
                const query = await fetch('http://127.0.0.1:3001/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Assurez-vous d'utiliser le type de contenu approprié
                    },
                    body: JSON.stringify(values),
                });
                const response = await query.json();


                setFilteredCards([response, ...filteredCards])
                setCards([response, ...cards])
                openNotificationWithIcon('success')
            })
            .catch((info) => {
                console.log(info);

                openNotificationWithIcon('error')
            });
        Modal.destroyAll();

    };

    const handleCancel = () => {
        Modal.destroyAll();

        setIsModalOpen(false);
    };
    const updateCards = (cards: Card[]) => {
        setFilteredCards([...cards]);
        setCards([...cards])
    }

    const openModal = (card: Card | null) => {
        setSelectedCard(card);
        setModalViewOpen(true);

    };

    return (
        <Layout style={{ height: '100%' }}>
            {contextHolder}
            <Modal title={"Ajouter Rapidement une Note"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} styles={{}} width={'80%'}>

                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                    <Form.Item name="tags" label="Tags">
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Tags Mode"
                            onChange={handleChange}
                            options={options}
                        />
                    </Form.Item>


                    <Form.Item name="title" label="Titre" rules={[{ required: true }]}>
                        <Input placeholder="input with clear icon" allowClear onChange={onChange} />
                    </Form.Item>
                    <Form.Item name="message" label="Message" rules={[{ required: true }]}>
                        <TextArea rows={4} autoSize={{ minRows: 15, maxRows: 15 }} />
                    </Form.Item>
                </Form>
            </Modal>
            <TestForm cards={cards} setCards={updateCards} card={selectedCard} modalVisible={isModalViewOpen} setModalVisible={setModalViewOpen} />
            <Layout>
                <HeaderComponent login={true} title={'Mes Notes'} />
                <Content style={{ margin: '24px 16px', padding: 24, borderRadius: borderRadiusLG }}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Input placeholder="Rechercher..." onChange={(e) => searchInCards(e.target.value)} />
                        <Row gutter={14} style={{ maxHeight: '100vh', paddingBottom: 200, overflowY: 'auto' }}>
                            {filteredCards && filteredCards.map((card: Card, index) => (
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} key={index} style={{ marginBottom: '14px' }}>
                                    <CardItem card={card} openModal={() => openModal(card)} />
                                </Col>
                            ))}
                        </Row>
                    </Space>
                </Content>
            </Layout>

            <FloatButton icon={<PlusOutlined />} onClick={showModal} type="primary" shape="square" style={{ right: 24, boxShadow: '0px 0px 35px 2px rgba(0,0,0,0.7)', }} />

        </Layout>
    );
};

export default App;
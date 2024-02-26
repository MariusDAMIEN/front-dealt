'use client'
import { Button, Flex, Space } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { Layout, theme } from 'antd';

const { Content, Footer } = Layout;

import App from './dashboard/page';
import HeaderComponent from '@/components/HeaderComponent';


export default function Component() {
  const { data: session } = useSession()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (session) {
    return <>
      <App />
    </>
  }
  return <Layout style={{ height: '100%' }}>
    <HeaderComponent login={false} title={"DEALT NOTES"} />


    <Content style={{ padding: '0 48px', justifyContent: 'center', alignSelf: 'center', paddingTop: 100 }}>
      <Space direction='vertical' >
        <p style={{ fontSize: 30, color: 'black' }}>Gérez vos Notes simplement</p>
        <Flex vertical gap="small" style={{ width: '100%' }}>
          <Button type="primary" block onClick={() => signIn()} style={{ marginTop: 20 }}>
            Commencer
          </Button>
        </Flex>
      </Space>
    </Content>
    <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
      Marius DAMIEN ©{new Date().getFullYear()} Test pour Dealt
    </Footer>
  </Layout>
}

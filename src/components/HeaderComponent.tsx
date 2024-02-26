// Header.tsx
import React from 'react';
import { Button, theme, Image } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { signIn, signOut } from 'next-auth/react';
import { Header } from 'antd/es/layout/layout';
import logoPng from '../../public/logo.png';
import { Archivo_Black } from 'next/font/google'
const inter = Archivo_Black({
    subsets: ['latin'],
    weight: '400',
})

interface HeaderComponentProps {
    login: boolean;
    title: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ login, title }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Header style={{ padding: 0, background: colorBgContainer, position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
            <Image width={70} style={{ paddingLeft: 20 }} src={logoPng.src} />
            <p className={inter.className} style={{ fontSize: 18 }}>{title}</p>
            <Button
                type="text"
                icon={login ? <LoginOutlined /> : <LogoutOutlined />}
                onClick={() => { login ? signOut() : signIn() }}
                style={{ justifySelf: 'right', fontSize: '16px', width: 64, height: 64 }}
            />
        </Header>
    );
};

export default HeaderComponent;

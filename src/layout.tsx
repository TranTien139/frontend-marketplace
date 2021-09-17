import React, {useCallback, useState} from "react";
import { Layout, Menu, Breadcrumb, Button, Modal } from 'antd';
import {Link} from 'react-router-dom'
import {useWallet} from "use-wallet";
const { Header, Content, Footer } = Layout;

const LayoutView = ({children})=>{

    const wallet  = useWallet()
    const {account} = wallet

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleUnlockClick = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onPresentAccountModal = ()=>{
        console.log('acoount')
    }
        return (
            <>
    <Layout className="layout">
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key={0}><Link to={'/'}>{`Home`}</Link></Menu.Item>
                <Menu.Item key={1}><Link to ={'/category'}>{`Category`}</Link></Menu.Item>
                <Menu.Item key={1000}>
                    {!account ? (
                        <Button onClick={handleUnlockClick} className="colllect-wallet">Connect Wallet</Button>
                    ) : (
                        <Button onClick={onPresentAccountModal} className="colllect-wallet">{account}</Button>
                    )}
                </Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
                {children}
            </div>
        </Content>
        <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p><button onClick={() => wallet.connect('injected')}>MetaMask</button></p>
            <p><button onClick={() => wallet.connect('wallletconnect')}>walllet connect</button></p>
        </Modal>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
                </>
        )
}
export default LayoutView

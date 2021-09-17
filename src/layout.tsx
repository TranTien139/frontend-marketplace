import React, {useCallback, useEffect, useState} from "react";
import { Layout, Menu, Breadcrumb, Button, Modal } from 'antd';
import styled from 'styled-components'
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

    useEffect(()=>{
        setIsModalVisible(false);
    }, [account])

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
    <Layout className="layout">
        <HeaderCustom>
            <div className="logo" />
            <Menu theme="dark" className={"list-menu"} mode="horizontal" defaultSelectedKeys={['2']}>
                <div><Link to={'/'}>{`Home`}</Link></div>
                <div><Link to ={'/about'}>{`About`}</Link></div>
                <div className="account">
                    {!account ? (
                        <Button onClick={handleUnlockClick} type="primary" className="colllect-wallet">Connect Wallet</Button>
                    ) : (
                        <Button onClick={handleUnlockClick} type="primary" className="colllect-wallet">{account}</Button>
                    )}
                </div>
            </Menu>
        </HeaderCustom>
        <Content style={{ padding: '30px 50px' }}>
            <div className="site-layout-content">
                {children}
            </div>
        </Content>
        <Modal title={!account ? "Login Wallet" : "My walllet"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {!account && <>
            <ButtonLogin><Button onClick={() => wallet.connect('injected')} type="primary">MetaMask</Button></ButtonLogin>
            <ButtonLogin><Button onClick={() => wallet.connect('walletconnect')} type="primary" >Wallet connect</Button></ButtonLogin>
             </>}
            {
                account && <ButtonLogin><Button onClick={() => wallet.reset()} type="primary">Logout</Button></ButtonLogin>
            }
        </Modal>
        <Footer style={{ textAlign: 'center' }}>©2020 Created by Tien Tran</Footer>
    </Layout>
            </>
        )
}

const HeaderCustom  = styled(Header)`
    .list-menu {
        display: block;
        background: transparent;
    >div{
        float: left;
        margin-right: 30px;
        a{
            color: #fff;
            font-size: 20px;
        }
    }
    .account{
        float: right;
    }
    }
`

const ButtonLogin = styled.div`
    button {
        width: 100%;
        margin-bottom: 20px;
    }
`
export default LayoutView

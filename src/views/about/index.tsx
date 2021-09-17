import Layout from "../../layout";
import React, {useEffect, useState} from "react";
import {useWallet} from "use-wallet";
import web3 from 'web3'
import TokenAmount from 'token-amount';
import {Input, Button, message} from 'antd'
import ExampleAbi from '../../config/abi/Example.json'
import {getExampleddress} from '../../config/addressHelpers'
import {getContract} from '../../helper/web3'

const About = ()=>{
    const {account} = useWallet()
    const [balance, setBalance] = useState(0)
    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState('0')
    const ExampleContract = getContract(ExampleAbi, getExampleddress())
    useEffect(()=>{
        const getBalnace = async ()=>{
            if(account && ExampleContract) {
                const balance = await ExampleContract.methods.balanceOf(account).call()
                setBalance(balance)
            }
        }
        getBalnace()
    }, [account, ExampleContract])

    const sendToken = ()=>{
        console.log(address, amount)
        if(ExampleContract && account) {
            ExampleContract.methods.transfer(address, web3.utils.toWei(amount)).send({
                from: account
            }).then(txHash => {
                console.log(txHash);
                message.error('Error send success ' + txHash);
            }).catch(err=>{
                message.error('Error send transaction' + err);
            });
        }else {
            message.error('Error');
        }

    }

    return (
        <Layout>
            <h2>About</h2>
            <p>Amount: {new TokenAmount(balance, 18, { symbol: 'MOCHI' }).format()}</p>
            {account && <p>Send Token:
                <Input placeholder="address" onChange={event => setAddress(event.target.value)} required={true} />
                <div style={{ marginBottom: 20 }}></div>
                <Input placeholder="amount" onChange={event => setAmount(event.target.value)} required={true} />
                <div style={{ marginBottom: 20 }}></div>
                <Button type="primary" onClick={sendToken}>Send</Button>
            </p>}
        </Layout>
    )
}
export default About

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useWallet, UseWalletProvider} from 'use-wallet'
import bsc from "@binance-chain/bsc-use-wallet";
import Home from './views/home'
import Category from './views/category'
import Layout from './layout'
import 'antd/dist/antd.css';

const App = () => {
    return (
        <Providers>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/category" exact>
                        <Category />
                    </Route>
                </Switch>
            </Router>
        </Providers>
    );
}

// @ts-ignore
const Providers:React.FC = ({children}) => {
    return(<UseWalletProvider
        connectors={{
            bsc,
            walletconnect: { rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/' },
        }}
    >
        {children}
    </UseWalletProvider>)
}

export default App;

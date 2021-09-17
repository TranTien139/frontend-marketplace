import addresses from './contracts'
const chainId = process.env.REACT_APP_CHAIN_ID || 97
console.log(chainId, "chainId")

export const getMulticallAddress = () => {
    return chainId ? addresses?.multicall[chainId] : null
}

export const getExampleddress = () => {
    return chainId ? addresses?.exampleContract[chainId] : null
}



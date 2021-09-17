const nodes = [
  process.env.REACT_APP_RPC_URL_0,
  process.env.REACT_APP_RPC_URL_1,
  process.env.REACT_APP_RPC_URL_2,
  process.env.REACT_APP_RPC_URL_3,
  process.env.REACT_APP_RPC_URL_4,
  process.env.REACT_APP_RPC_URL_5
]

const getNodeUrl = () => {
  const lengthNode = nodes.length
  const randomIndex = Math.floor(Math.random() * lengthNode)
  return nodes[randomIndex] ? nodes[randomIndex] : nodes[0]
}

export default getNodeUrl

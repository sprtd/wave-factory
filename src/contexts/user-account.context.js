import { useState, createContext } from "react";
// import { ethers } from "ethers";

export const UserAccountContext = createContext()

const UserAccountContextProvider = ({ children }) => {
  const [ accountDetails, setAccountDetails ] = useState('')

  const [ isConnectedToEthereum, setIsConnectedToEthereum ] = useState(false)
  const checkEthereumConnection = async() => {
    const { ethereum } = window
    if(ethereum) {
      setIsConnectedToEthereum(true)

      
    } else {
      
      setIsConnectedToEthereum(false)

    }
  }

  const setAccountProfile = payload => {
    setAccountDetails(payload)
  }

  


  return (
    <UserAccountContext.Provider 
      value={{ 
        isConnectedToEthereum, 
        setIsConnectedToEthereum, 
        checkEthereumConnection,
        setAccountProfile,
        accountDetails
      }}>
      { children }
    </UserAccountContext.Provider>
  )
}

export default UserAccountContextProvider
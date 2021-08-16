import { MainLayoutWrapper } from "./main-layout.style"
import { ethers } from "ethers"
import { useContext, useEffect, useState } from "react"
import { UserAccountContext } from "../../contexts/user-account.context"
import { ContractContext } from "../../contexts/contract-functions.context"

const MainLayout = () => {
  const { isConnectedToEthereum, setIsConnectedToEthereum, setAccountProfile } = useContext(UserAccountContext)
  const { getWave, waveGlobalCount, sendWave } = useContext(ContractContext)

  
  const connectToWeb3 = async() => {

    const { ethereum } = window
    if (ethereum) {
      try {
        const [ account ] = await ethereum.request({ method: 'eth_requestAccounts'})
        return setAccountProfile(account)
      } catch(err) {
        console.log(err)
      }

    } else {
      console.log('nawa o')
    }
   

  }

 

  useEffect(() => {
    const requestAccount = async() => {
      const { ethereum } = window
      if(!ethereum) {
        setIsConnectedToEthereum(false)
        alert('you need to download and install metamask to use this dapp')
        
      } else {
        setIsConnectedToEthereum(true)
        
      }
      try {
        const [ account ] = await ethereum.request({ method: 'eth_accounts'})
        console.log('this is the chosen account, ', account)
        await setAccountProfile(account)
        getWave()
      } catch(err) {
        console.log(err)
      }
    }

    requestAccount()
  },[])



  return (
    <MainLayoutWrapper>
      <h1>👋 Hey There! </h1>
      { waveGlobalCount > 0 ? <h2>Total Waves: { waveGlobalCount }</h2> : null}
      { isConnectedToEthereum ? <button onClick={ sendWave }>Wave at me!</button> : <button onClick={ connectToWeb3 }> Connect Wallet</button> } 
    </MainLayoutWrapper>
  )


}

export default MainLayout
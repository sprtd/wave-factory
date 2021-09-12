import { MainLayoutWrapper, StatusWrapper, WaveWrapper } from "./main-layout.style"
import { ethers } from "ethers"
import { useContext, useEffect, useState } from "react"
import { UserAccountContext } from "../../contexts/user-account.context"
import { ContractContext } from "../../contexts/contract-functions.context"

const MainLayout = () => {
  const { isConnectedToEthereum, setIsConnectedToEthereum, setAccountProfile } = useContext(UserAccountContext)
  const {  getWave, waveGlobalCount, sendWave, getAllWaves, waveArray, getContractETHBalance, contractBalance } = useContext(ContractContext)

  const [formEntry, setFormEntry] = useState('')

  const connectToWeb3 = async() => {
    const { ethereum } = window
    if (ethereum) {
      try {
        const [ account ] = await ethereum.request({ method: 'eth_requestAccounts'})
        return setAccountProfile(account)
      } catch(err) {
        console.log('debug from load', err)
      }
    } else {
      console.log('get metamask')
    }
  }


  
  const handleSubmit = e => {
    e.preventDefault()
    sendWave(formEntry)
    
  }

  useEffect(() => {
    const requestAccount = async() => {
      const { ethereum } = window
      if(!ethereum) {
        setIsConnectedToEthereum(false)
        alert('you need to download and install metamask to use this dapp')
        
      } else {
        // console.log('this ethereum object', ethereum)
        setIsConnectedToEthereum(true)
        ethereum.on('accountsChanged', () => {
          window.location.reload()
        })

        ethereum.on('chainChanged', () => {
          window.location.reload()
        })
        
      }
      try {
        const [ account ] = await ethereum.request({ method: 'eth_accounts'})
        // console.log('this is the chosen account, ', account)
        await setAccountProfile(account)
        getWave()
        getAllWaves()
        getContractETHBalance()
      } catch(err) {
        console.log(err)
      }
    }

    requestAccount()
  },[])

  console.log(formEntry)



  return (
    <MainLayoutWrapper>
      <h1>Wave Portal Dapp </h1>
      <StatusWrapper>
        <h4 style={{textAlign: 'left'}}>ETH Balance: { contractBalance ? `${contractBalance}ETH` : null } </h4>
        { waveGlobalCount > 0 ? <h4>Total Waves: { waveGlobalCount }</h4> : null}
      </StatusWrapper>
      
      <textarea onChange={e => setFormEntry(e.target.value)} value={ formEntry } placeholder='Leave your message here...' rows='4' />
      { isConnectedToEthereum ? <button onClick={ handleSubmit }>Wave at me! 👋</button> : <button onClick={ connectToWeb3 }> Connect Wallet</button> } 

      {waveArray ? waveArray.map((wave, index) => {
        const {message, timestamp, waver} = wave
        return (
          <WaveWrapper key={index}>
            <span>Message: { message }</span>
            <span>Waver: { waver }</span>
            <span>Time Waved: { Date(timestamp) }</span>

          </WaveWrapper>
      
        )
      }) : null}
    </MainLayoutWrapper>
  )


}

export default MainLayout
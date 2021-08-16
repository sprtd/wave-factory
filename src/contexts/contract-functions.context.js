import { useState, createContext } from "react";
import { ethers } from "ethers";
import WavePortal from '../artifacts/contracts/WavePortal.sol/WavePortal.json'

export const ContractContext = createContext()

const ContractContextProvider = ({ children }) => {
  const waveContract = '0x3c610d9e5ca31df5b69a3d30265658e6fa823186'

  let initialCount
  const [ waveGlobalCount, setWaveGlobalCount ] = useState(initialCount)
 


  const getWave = async() => {
    const { ethereum } = window
    if(ethereum) {
      const [ account ] = await ethereum.request({ method: 'eth_requestAccounts'})
      const provider = new ethers.providers.Web3Provider(ethereum)
      const wavePortal = new ethers.Contract(waveContract, WavePortal.abi, provider )

      try {
        const waveCount = await wavePortal.getTotalWaves()
        setWaveGlobalCount(waveCount.toString())
        console.log('this is the total waves', waveGlobalCount)


      } catch(err) {
        console.log(err)

      }

    }
  }
  
  const requestAccount = async() => {
    await window.ethereum.request({ method: 'eth_requestAccounts'})
  }

  const sendWave = async() => {
    const { ethereum } = window
    if(ethereum) {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(ethereum)
      
      const signer = await provider.getSigner()
      console.log('this is the signer', signer)
      const wavePortal = new ethers.Contract(waveContract, WavePortal.abi, signer)

      try {
        const wave = await wavePortal.wave()
        const waveTxn = await wave.wait()
        if(waveTxn) {
          getWave()
        }

      } catch (err) {
        console.log(err)
        
      }
    }
  }

 

  


  return (
    <ContractContext.Provider  value={{ getWave, waveGlobalCount, sendWave }}>
      { children }
    </ContractContext.Provider>
  )
}

export default ContractContextProvider
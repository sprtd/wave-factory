import { useState, createContext } from "react";
import { ethers } from "ethers";
import WavePortal from '../artifacts/contracts/WavePortal.sol/WavePortal.json'

export const ContractContext = createContext()

const ContractContextProvider = ({ children }) => {
  // const waveContractAddress = '0x3c610d9e5ca31df5b69a3d30265658e6fa823186'
  const waveContractAddress = '0x382f72CfdAf0c1326e00103F9b3069A9C99dcC62'

  let initialCount
  
  const [ waveGlobalCount, setWaveGlobalCount ] = useState(initialCount)
  const [waveArray, setWaveArray] = useState('')

  const { ethereum } = window
  const provider = new ethers.providers.Web3Provider(ethereum)
  const wavePortal = new ethers.Contract(waveContractAddress, WavePortal.abi, provider )




  
 
  const getAllWaves = async() => {

    try {
      const fetchedWaves = await wavePortal.getAllWaves()
      console.log('fetched waves', fetchedWaves)

      let sanitizedWaves = []
      fetchedWaves.forEach(wave => {
        const { message, waver, timestamp} = wave
        sanitizedWaves.push({message, waver, timestamp: new Date(timestamp * 1000)})
      })
      setWaveArray(sanitizedWaves)

    } catch(err) {
      console.log(err)
    }
    
  }

  // get total number of wave count
  const getWave = async() => {
    if(ethereum) {
      const [ account ] = await ethereum.request({ method: 'eth_requestAccounts'})   

      try {
        const waveCount = await wavePortal.getWaveCount()
        setWaveGlobalCount(waveCount.toNumber())
        console.log('this is the total waves', waveCount.toNumber())


      } catch(err) {
          console.log(err)
      }

    }
  }



  
  const requestAccount = async() => {
    
    await ethereum.request({ method: 'eth_requestAccounts'})
  }


  const listenNewWaveEvent = async() => {

    try {
      let waveContract = new ethers.Contract(waveContractAddress, WavePortal.abi, provider)
      await waveContract.on('NewWave', (from, message, timestamp) => {
        console.log('this is the from', from )
        
        console.log('this is message', message)
        console.log('this is timestamp', timestamp)
      })

    } catch(err) {
      console.log(err)
    }

  }

  const sendWave = async(payload) => {
    if(ethereum) {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(ethereum)
      
      const signer = await provider.getSigner()
      // console.log('this is the signer', signer)
      const wavePortal = new ethers.Contract(waveContractAddress, WavePortal.abi, signer)

      listenNewWaveEvent()

     

      try {
        const wave = await wavePortal.wave(payload)
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
    <ContractContext.Provider  value={{ getWave, waveGlobalCount, sendWave, getAllWaves, waveArray }}>
      { children }
    </ContractContext.Provider>
  )
}

export default ContractContextProvider
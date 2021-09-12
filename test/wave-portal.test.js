const { parseEther, formatEther } = require('@ethersproject/units')
const { expect, assert } = require('chai')

describe('Wave', () => {
  let WaveFactory, waveContract, owner, addr1, addr2

  beforeEach(async() => {
    WaveFactory = await ethers.getContractFactory('WavePortal')
    waveContract = await WaveFactory.deploy({value: parseEther('200')});

    [ owner, addr1, addr2 ] = await ethers.getSigners()

  })

  describe('Deployment', () => {
    let initialWaveCount
    it('Should have initial value of zero after deployment', async() => {
      initialWaveCount = await waveContract.getWaveCount()
      expect(initialWaveCount.toString()).to.equal('0')
    })
  })


  describe('Wave Transaction', () => {
    let setMessage = 'Alpha'

    it('Accepts message entry, updates the state of wave and returns wave metadata ', async() => {

      const waveTxn = await waveContract.connect(owner).wave(setMessage)
      await waveTxn.wait()
      const waveCount = await waveContract.getWaveCount()

      const getWaveInfo = await waveContract.getWaveInfo(waveCount - 1)
      const waveMessage = getWaveInfo._message
      const waver = getWaveInfo._waver

      const timestamp = getWaveInfo._timestamp
      console.log('this is the timestamp', timestamp.toNumber())

      assert.equal(waveMessage, setMessage)
      assert(waver, owner)
    })

    it('Pays out ETH to wavers after successful wave', async() => {
      const contractBalBeforeWave = await waveContract.getContractBalance();
      const addr1BalBeforeWave = await waveContract.getEOABalance();
      
      const formatedContractBalance1 = formatEther(contractBalBeforeWave)
      console.log('omo contract', formatedContractBalance1)
      
      const formatedAddr1BalBeforeWave= formatEther(addr1BalBeforeWave)
      console.log('EOA balance:', formatedAddr1BalBeforeWave)
      
      const msg1 = 'Test mode'
      
      const waveTxn = await waveContract.connect(addr1).wave(msg1)

      await waveTxn.wait()
      
      const contractBalanceAfterWave = await waveContract.getContractBalance();
      const formatedContractBalance2 = formatEther(contractBalanceAfterWave)

      const addr1BalanceAfterWave = await waveContract.getEOABalance();
      const formatedAddr1AfterWave = formatEther(addr1BalanceAfterWave)
      assert.equal(formatedAddr1AfterWave, formatedAddr1BalBeforeWave + 20, 'one')

      assert.equal(formatedContractBalance2, formatedContractBalance1 - 20, 'two' )

    })



    it('Increases wave count after each wave', async() => {
      const waveCount1 = await waveContract.getWaveCount()
      console.log('test wave count 3', waveCount1.toNumber())
      
      const setMessage = 'Alpha 2'
      const waveTxn = await waveContract.connect(addr1).wave(setMessage)
      await waveTxn.wait()
      const waveCount2 = await waveContract.getWaveCount()
      assert.equal(waveCount2.toNumber(), waveCount1.toNumber() + 1)
    })

  })


})
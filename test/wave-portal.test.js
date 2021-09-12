const { expect, assert } = require('chai')

describe('Wave', () => {
  let WaveFactory, waveContract, owner, addr1, addr2

  beforeEach(async() => {
    WaveFactory = await ethers.getContractFactory('WavePortal')
    waveContract = await WaveFactory.deploy();

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
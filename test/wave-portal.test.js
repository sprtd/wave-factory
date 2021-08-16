const { expect } = require('chai')

describe('Wave', () => {
  let WaveFactory, waveContract, owner, addr1, addr2

  beforeEach(async() => {
    WaveFactory = await ethers.getContractFactory('WavePortal')
    waveContract = await WaveFactory.deploy();

    [ owner, addr1, addr2 ] = await ethers.getSigners()

  })

  describe('Deployment', () => {
    let initialWaveCount, finalWaveCount
    it('Should have initial value of zero after deployment', async() => {
      initialWaveCount = await waveContract.getTotalWaves()
      expect(initialWaveCount.toString()).to.equal('0')
    })

    it('Should increase the value of totalWaves by 1 after waving', async() => {
      const waveTxn = await waveContract.connect(addr1).wave()
      await waveTxn.wait()

      const waveTxn2 = await waveContract.connect(addr2).wave()
      await waveTxn2.wait()
      
      const waveTxn3 = await waveContract.connect(addr2).wave()
      await waveTxn3.wait()

      

      finalWaveCount = await waveContract.getTotalWaves()
      expect(finalWaveCount).to.equal(initialWaveCount + 3)
    } )
  })


})
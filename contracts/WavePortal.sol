//SPDX-License-Identifier: Unlicense
pragma solidity >=0.4.0 <0.9.0;
import "hardhat/console.sol";



contract WavePortal {
  
  uint internal waveCount;

  struct Wave {
    string message;
    address waver;
    uint timestamp;
  }

  Wave[] public waves;


  event NewWave(address indexed from, string message, uint timestamp);


  constructor() payable {
    console.log("%s - wave portal ETH balance", address(this).balance);
  }
  

  function wave(string memory _message) public {
      
    Wave memory newWave = Wave({
      message: _message,
      waver: msg.sender,
      timestamp: block.timestamp
    });
      
    waves.push(newWave);

    waveCount ++;
    console.log('%s is the waver', msg.sender);
    emit NewWave(newWave.waver, newWave.message, newWave.timestamp);

    uint rewardAmount = 0.0001 ether;

    require(rewardAmount <= address(this).balance, 'Available ETH balance in contract lower than reward amount');
    (bool success, ) = msg.sender.call{value: rewardAmount}('');
    require(success, 'Failed to ');

    if(address(this).balance < rewardAmount) {
      revert('ETH bal below benchmark');
    }
    
  }
  function getAllWaves() public view returns(Wave[] memory)  {
    return waves;
  }


  function getWaveCount() public view returns(uint) {
    
    console.log('%s is the current wave count', waveCount);
    return waveCount;
  }

  function getWaveInfo(uint _waveCount) public view returns(string memory _message, address _waver, uint _timestamp) {
    Wave storage newWave = waves[_waveCount];

    _message = newWave.message;

    _waver = newWave.waver;
    _timestamp = newWave.timestamp;
    // return(newWave.message, newWave.waver, newWave.timestamp);

  }


  function getContractBalance() public view returns(uint contractETHBalance) {
    contractETHBalance = address(this).balance;
  }


  function getEOABalance() public view returns(uint EOABalance) {
    EOABalance = msg.sender.balance;
  }









}
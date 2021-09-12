//SPDX-License-Identifier: Unlicense
pragma solidity >=0.4.0 <0.9.0;
import "hardhat/console.sol";



contract WavePortal {
  
  uint internal waveCount;
  uint private seed;

  struct Wave {
    string message;
    address waver;
    uint timestamp;
  }

  Wave[] public waves;
  mapping(address => uint) public lastWavedAt;




  event NewWave(address indexed from, string message, uint timestamp);
  event RewardedWithETH(address indexed to, uint ethReward);
  event BetterLuck(string message);


  constructor() payable {
    console.log("%s - wave portal ETH balance", address(this).balance);
  }
  

  function wave(string memory _message) public {
    require(bytes(_message).length > 0, 'message cannot be blank');

    require(lastWavedAt[msg.sender] + 15 minutes < block.timestamp, 'Wait 15mins');
    lastWavedAt[msg.sender] = block.timestamp;
      
    Wave memory newWave = Wave({
      message: _message,
      waver: msg.sender,
      timestamp: block.timestamp
    });
      
    waves.push(newWave);

    waveCount ++;
    console.log('waver: %s', msg.sender);
    emit NewWave(newWave.waver, newWave.message, newWave.timestamp);

   
    uint randomNum = (block.difficulty  +  block.timestamp + seed) % 100;
    console.log('random number: %s', randomNum);

    seed = randomNum;

    if(randomNum < 50) {
      uint rewardAmount =  0.0001 ether;

      require(rewardAmount <= address(this).balance, 'Available ETH balance in contract lower than reward amount');
      (bool success, ) = msg.sender.call{value: rewardAmount}('');
      require(success, 'Failed to send ETH');
      console.log('%s won', msg.sender);
      emit RewardedWithETH(msg.sender, rewardAmount);

    } else {
      string memory betterLuck = "Better luck next time";
      emit BetterLuck(betterLuck);
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
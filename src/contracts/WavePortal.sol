//SPDX-License-Identifier: Unlicense
pragma solidity >=0.4.0 <0.9.0;
import "hardhat/console.sol";



contract WavePortal {
  
  uint totalWaves = 0;
  string message;

  struct Wave {
    string message;
    address waver;
    uint timestamp;
  }

  Wave[] public waves;


  mapping(address => uint) public messages;

  constructor() {
    console.log("this is wave portal contract");
  }
  

  function wave(string memory _message) public {
    waves.push(Wave({
      message: _message,
      waver: msg.sender,
      timestamp: block.timestamp
    }));

    totalWaves ++;
  }


  function getTotalWaves() public view returns(uint) {
    return totalWaves;
  }


  function getWaveMessage() public view returns(Wave[] memory)  {
    return waves;
  }





}
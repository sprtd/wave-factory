//SPDX-License-Identifier: Unlicense
pragma solidity >=0.4.0 <0.9.0;
import "hardhat/console.sol";



contract WavePortal {
  uint totalWaves = 0;

  constructor() {
    console.log("this is wave portal contract");
  }
  

  function wave() public {
    totalWaves ++;
  }


  function getTotalWaves() public view returns(uint) {
    return totalWaves;
  }




}
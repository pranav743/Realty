// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Test {
    
    struct Details {
        uint256 _number;
        string _name;
    }

    mapping(uint256 => Details) public data;
    uint256[] public allNumbers;

    function addData(uint256 _number, string memory _name) public {
        Details memory newDetails = Details(_number, _name);
        data[_number] = newDetails;
        allNumbers.push(_number);
    }

    function retrieveAllData() public view returns (Details[] memory) {
        Details[] memory allDetails = new Details[](allNumbers.length);
        for (uint256 i = 0; i < allNumbers.length; i++) {
            uint256 number = allNumbers[i];
            allDetails[i] = data[number];
        }
        return allDetails;
    }
}

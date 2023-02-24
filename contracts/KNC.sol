// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KNC is ERC20("Kyber Network Crystal", "KNC") {
    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}

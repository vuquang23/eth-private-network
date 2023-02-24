// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDT is ERC20("Tether USD", "USDT") {
    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.1 <0.9.0;
struct renter {
    address add;
    uint256 time;
}

contract SimpleAuction {
    address payable public   owner;

    constructor() {
        owner = payable(msg.sender);
    }

    event toPay(address addd, uint256 timeSpent);
    error Unsufficient(string name);
    mapping(uint256 => renter) public cars;

    function rent(uint256 carNumber) public {
        require(msg.sender != owner, "you are owner");
        require(cars[carNumber].add == address(0), "Already booked");
        cars[carNumber].add = msg.sender;
        cars[carNumber].time = block.timestamp;
    }

    function turnIn(uint256 carNumber) public payable {
        require(msg.sender != owner, "you are owner");
        require(
            cars[carNumber].add == msg.sender,
            "cannot return someones else car Or Not yet Owned"
        );
        uint256 rentTime = amountToPay(carNumber);
        uint256 amount = 0.01 ether * (rentTime);
       // require(msg.value >= amount, "not paid required amount");
        emit toPay(msg.sender, amount);
        if (msg.value == amount) {
            owner.transfer(amount);
            cars[carNumber].add = address(0);
            cars[carNumber].time = 0;
        } else if (msg.value > amount) {
            owner.transfer(amount);
            payable(msg.sender).transfer(msg.value - amount);
            cars[carNumber].add = address(0);
            cars[carNumber].time = 0;
        } else {
            revert Unsufficient("not paid required amount");
        }
    }

    function amountToPay(uint256 carNumber) public view returns (uint256) {
        require(
            cars[carNumber].add == msg.sender,
            "cannot return someones else car Or Not yet Owned"
        );
        uint256 amountPay = (block.timestamp - cars[carNumber].time);
        return amountPay;
    }
}

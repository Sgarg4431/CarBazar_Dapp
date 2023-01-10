const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {ethers}=require("hardhat");

describe("Rent", function () {
  let Rent,rent,deployer,add1,add2;
  beforeEach(async function(){
    Rent=await ethers.getContractFactory("SimpleAuction");
    rent=await Rent.deploy();
    [deployer,add1,add2]=await ethers.getSigners();
  });
  describe("Testing deployment",function(){
    it("Should deploy at right address",async function(){
      expect(await rent.owner()).to.be.equal(await deployer.getAddress());
    })
  });
  describe("Testing rent function",function(){
    it("Should return owner error",async function(){
      await expect(rent.rent(0)).to.be.revertedWith("you are owner");
    })
    it("Should return already booked error",async function(){
      await rent.connect(add1).rent(0);
      await expect(rent.connect(add2).rent(0)).to.be.revertedWith("Already booked");
    })
    it("Should rent a car successfully",async function(){
      await rent.connect(add1).rent(0);
      const car=await rent.cars(0);
      expect(await car.add).to.be.equal(await add1.getAddress());
    })
  });
  describe("Testing turnIn function",function(){
    it("Should return owner error",async function(){
      await expect(rent.turnIn(0)).to.be.revertedWith("you are owner");
    })
    it("should return error of booked",async function(){
      await expect(rent.connect(add2).turnIn(0)).to.be.revertedWith("cannot return someones else car Or Not yet Owned");
    })
    it("Should return error of amount",async function(){
      await rent.connect(add1).rent(0);
      await expect(rent.connect(add1).turnIn(0,{value:0})).to.be.revertedWith("not paid required amount");
    })
    it("Should turn in car",async function(){
      await rent.connect(add1).rent(0);
      await rent.connect(add1).turnIn(0,{value:ethers.utils.parseEther("1")})
      const car=await rent.cars(0);
      expect(await car.add).to.be.equal("0x0000000000000000000000000000000000000000");
    })
  })
});

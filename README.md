
# Car Bazar

This is a simple decenterlized application (Dapp) built on Goerli testnet in which a person
could rent a car for a particular period of time, return it and check the amount need to be paid

Owner cannot rent a car to himeself

In this app person will not be able to rent a car which is already booked
and will not be able to return someone else car, means if person tries
to do so application would alert him/her.


## Features

- ### Renting a car 
A person could rent a car starting from index 0 if available using rent button 
- ### Return the car 
Once the person is done with the usage of car it could be returned using return button and paying the amount charged
- ### Check the availability  
Before renting a car of particular index its availability could be checked by using check car button
- ### Amount charged
Amount needed to be paid at the time of return could be checked using amountToPay button 



## Demo

https://carrent-nu.vercel.app/


## Tech Stack
The frontend is built using React

On the Web3 side, the contract is written in Solidity and compiled and deployed, tested using Hardhat. 

For interaction with frontend ether.js library is used
## Limitations

The most prominent limitation of this Car bazar system is that it's proper functioning is heavily dependent on how it's going to be interacted with. The buttons are not turned off (i.e. made un-clickable) at any moment. So, if a participant decides to just go ahead and randomly start clicking the buttons in between transactions, the application is mostly likely going to report an error or even worse, it may crash. Therefore, patiently wait for the transaction to complete and the updates to appear on screen

The contract is manually tested using Remix IDE and Hardhat.

 
## What I Learned

- Knowledge of Solidity and Ethereum alone is not enough to build a fully functional dApp
  
  - Frontend designing skills probably comes first

- How to host my own React project for free on Vercel
- Interacting with MetaMask wallet using Ether.js


## 🔗 Connect with me
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shubham-garg-6232181b8/)




# Decentralized Attendance System

## Overview
This is a **Decentralized Attendance System DApp** built on Ethereum using Solidity smart contracts and a React frontend. The system allows students to register themselves and mark their attendance in a secure and tamper-proof way using blockchain technology.

## Features
- **Student Registration**: Students can register themselves on the blockchain.
- **Admin Registration**: Admin can register students manually.
- **Attendance Marking**: Registered students can mark their attendance once per day.
- **Attendance Tracking**: Students can check their attendance count.

## Technologies Used
- **Solidity**: Smart contract development.
- **Remix IDE**: Contract deployment and testing.
- **Ethers.js**: Interaction with Ethereum blockchain.
- **React.js**: Frontend for user interaction.
- **MetaMask**: Ethereum wallet for transactions.

## Smart Contract
The smart contract is written in Solidity and deployed using **Remix IDE**. The contract handles student registration, attendance marking, and retrieval of student data.

### Smart Contract Address
```
0xf7F6F9c83DD14ECC90496FC5E35708897495A2b8
```

## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- **Node.js** (https://nodejs.org/)
- **MetaMask** (https://metamask.io/)
- **Remix IDE** (https://remix.ethereum.org/) for contract deployment

### Steps to Run Locally
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/decentralized-attendance-dapp.git
   cd decentralized-attendance-dapp
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Start the frontend**
   ```sh
   npm start
   ```
4. **Connect MetaMask**: Ensure MetaMask is connected to the correct Ethereum network.

## Usage
1. **Connect Wallet**: The dApp will prompt you to connect your MetaMask wallet.
2. **Register Student**: If not registered, enter your name and register.
3. **Mark Attendance**: Once registered, click the "Mark Attendance" button once per day.
4. **Admin Functions** (optional): If logged in as admin, manually register students.

## Deployment
The contract is deployed on **Remix IDE**. For production deployment, you can use **Infura** or **Hardhat**.

## License
This project is licensed under the **MIT License**.

## Author
**Ananya Bansal** - https://github.com/bAnanya16


import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import AttendanceABI from "./AttendanceABI.json"; // ABI from contract compilation

const CONTRACT_ADDRESS = "0xf7F6F9c83DD14ECC90496FC5E35708897495A2b8";

const AttendanceDApp = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const initBlockchain = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);

        const web3Signer = web3Provider.getSigner();
        setSigner(web3Signer);

        const attendanceContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          AttendanceABI,
          web3Signer
        );
        setContract(attendanceContract);

        const accounts = await web3Provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        checkRegistration(attendanceContract, accounts[0]);
      } else {
        alert("Please install MetaMask to use this dApp!");
      }
    };

    initBlockchain();
  }, []);

  const checkRegistration = async (contractInstance, userAddress) => {
    try {
      const student = await contractInstance.students(userAddress);
      if (student.isRegistered) {
        setIsRegistered(true);
        setAttendanceCount(student.attendanceCount.toNumber());
      }
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };

  const registerStudent = async () => {
    if (contract && name.trim()) {
      try {
        const tx = await contract.registerStudent(name);
        await tx.wait();
        alert("Registration successful!");
        setIsRegistered(true);
        checkRegistration(contract, account);
      } catch (error) {
        console.error("Error registering:", error);
      }
    }
  };

  const markAttendance = async () => {
    if (contract) {
      try {
        const tx = await contract.markAttendance();
        await tx.wait();
        alert("Attendance marked!");
        checkRegistration(contract, account);
      } catch (error) {
        console.error("Error marking attendance:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">
          Decentralized Attendance System
        </h1>
        <p className="text-sm text-gray-600 text-center mb-2">
          Connected Wallet: <span className="font-semibold">{account}</span>
        </p>

        {!isRegistered ? (
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={registerStudent}
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4 text-center">
            <p className="text-lg font-medium">Attendance Count: {attendanceCount}</p>
            <button
              onClick={markAttendance}
              className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              Mark Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceDApp;

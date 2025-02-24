// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttendanceSystem {
    address public admin;

    struct Student {
        uint256 id;
        string name;
        address studentAddress;
        bool isRegistered;
        uint256 attendanceCount;
        uint256 lastAttendanceTime;
    }

    mapping(address => Student) public students;
    address[] public studentList;

    event StudentRegistered(uint256 id, string name, address indexed studentAddress);
    event AttendanceMarked(address indexed studentAddress, uint256 totalAttendance);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyRegisteredStudent() {
        require(students[msg.sender].isRegistered, "You are not registered.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerStudent(string memory _name) public {
        require(!students[msg.sender].isRegistered, "Already registered");
        uint256 newId = studentList.length + 1;

        students[msg.sender] = Student(newId, _name, msg.sender, true, 0, 0);
        studentList.push(msg.sender);

        emit StudentRegistered(newId, _name, msg.sender);
    }

    function markAttendance() public onlyRegisteredStudent {
        require(block.timestamp - students[msg.sender].lastAttendanceTime > 1 days, "Attendance already marked today");
        
        students[msg.sender].attendanceCount += 1;
        students[msg.sender].lastAttendanceTime = block.timestamp;

        emit AttendanceMarked(msg.sender, students[msg.sender].attendanceCount);
    }

    function getStudentAttendance(address _studentAddress) public view returns (uint256) {
        require(students[_studentAddress].isRegistered, "Student not registered");
        return students[_studentAddress].attendanceCount;
    }

    function getAllStudents() public view onlyAdmin returns (address[] memory) {
        return studentList;
    }
}

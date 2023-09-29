function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10),
    });
    return employee;
}

function createTimeOutEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10),
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find((event) => event.date === date);
    const timeOut = employee.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce(
        (acc, date) => acc + wagesEarnedOnDate(employee, date),
        0
    );
    return totalWages;
}

function calculatePayroll(employees) {
    return employees.reduce((acc, employee) => acc + allWagesFor(employee), 0);
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll,
};

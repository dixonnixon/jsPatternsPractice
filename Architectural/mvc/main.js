const employeeView = new EmployeeView();
const employeeCtrl = new EmployeeController();
employeeView.registerWith(employeeCtrl);


employeeView.registerWith(employeeCtrl);
console.log("Hiring a new employee Rachel");
employeeView.hire("Rachel", "Team Lead");


console.log("Hiring a new employee Jack");
employeeView.hire("Jack", "Software Engineer");
// console.log("Updating the name of employee with id 0");
employeeView.editName(0,"Monica");
// console.log("Updating the name of an employee with id 7");
employeeView.editName(7,"Joey");
// console.log("Updating the name of an employee with id 1");
employeeView.editName(1,"Joey1");
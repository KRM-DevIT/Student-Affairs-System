export default class Employee {
  constructor(id, name, email, department, position, hireDate, salary, active = true) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.department = department;
    this.position = position;
    this.hireDate = hireDate;
    this.salary = salary;
    this.active = active;
  }
}

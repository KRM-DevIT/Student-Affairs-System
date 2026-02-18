export default class Instructor {
  constructor(id, name, email, department, title, office, phone, courses = [], hiredDate, tenured = false) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.department = department;
    this.title = title;
    this.office = office;
    this.phone = phone;
    this.courses = courses;
    this.hiredDate = hiredDate;
    this.tenured = tenured;
  }
}

export default class Student {
  constructor(id , name , email, age, department ,enrolled = true) {
    if (id == null) throw new Error("id required");
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.department = department;
    this.enrolled = enrolled;
  }
}

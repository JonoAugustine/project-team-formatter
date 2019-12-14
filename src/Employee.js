class Employee {
  constructor(name, id, email, role) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }

  getName = () => this.name;
  getId = () => this.id;
  getEmail = () => this.email;
  getRole = () => this.role;
}

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email, "Manager");
    this.officeNumber = officeNumber;
  }
}

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email, "Engineer");
    this.github = github;
  }

  getGithub = () => this.github;
}

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email, "Intern");
    this.school = school;
  }

  getSchool = () => this.school;
}

module.exports = { Employee, Manager, Engineer, Intern };

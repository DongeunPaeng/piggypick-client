class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hi, my name is ${this.name}.`
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }
  getDescription() {
    let description = super.getDescription();
    if (this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }
    return description;
  }
}

class Traveler extends Person {
  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }
  getGreeting() {
    let greetings = super.getGreeting();
    if (this.homeLocation) {
      greetings += ` I'm from ${this.homeLocation}.`;
    }
    return greetings;
  }
}

const me = new Traveler('Dongeun Paeng', 32, 'Seoul');
console.log(me.getGreeting());

const other = new Traveler();
console.log(other.getGreeting());

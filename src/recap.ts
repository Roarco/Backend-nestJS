/* typado de datos con typescript. */

//const text: string;
//const num : number;
//const bool: boolean;
//const arr: Array<number>[];

/* funciones */
const sumar = (a: number, b: number) => {
  return a + b;
};
sumar(1, 2);

const sumar2 = (a: number, b: number): number => a + b;
sumar2(2, 3);

/* clases */

class Person {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `I'm ${this.name} and I'm ${this.age}`;
  }
}

const person1 = new Person(23, 'Jorge');
person1.getSummary();

/* POO */

class Alumno {
  private name;
  private lasName;

  constructor(name: string, lasName: string) {
    this.name = name;
    this.lasName = lasName;
  }

  getFullName() {
    return `${this.name} ${this.lasName}`;
  }

  getName() {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getLasName() {
    return this.lasName;
  }
  setLasName(lasName: string) {
    this.lasName = lasName;
  }
}

const alumno1 = new Alumno('Jorge', 'Garcia');
alumno1.getFullName();

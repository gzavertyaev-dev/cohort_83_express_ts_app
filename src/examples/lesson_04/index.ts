// Как было до классов
// interface Cooker {
//   name: string;
//   cookFood: (foodName: string) => { name: string; tasty: true };
// }

// const cooker: Cooker = {
//   name: "Alex",
//   cookFood: (foodName: string) => {
//     return { name: foodName, tasty: true };
//   },
// };

// console.log(cooker);
// console.log(cooker.name);
// console.log(cooker.cookFood("Pizza"));

// const cooker2: Cooker = {
//   name: "John",
//   cookFood: (foodName: string) => {
//     return { name: foodName, tasty: true };
//   },
// };

// console.log(cooker2);
// console.log(cooker2.name);
// console.log(cooker2.cookFood("Pasta"));

////////////////////////////////////////

class ChefCook {
  name: string;

  constructor(cookerName: string) {
    this.name = cookerName;
  }

  cookFood(foodName: string) {
    return { foodName, tasty: true };
  }
}

const alexChefCooker = new ChefCook("Alex");
// console.log(alexChefCooker);
// console.log(alexChefCooker.name);
// console.log(alexChefCooker.cookFood("Pizza"));

// const johnChefCooker = new ChefCook("John");
// console.log(johnChefCooker);
// console.log(johnChefCooker.name);
// console.log(johnChefCooker.cookFood("Pasta"));
// const bradChefCooker = new ChefCook("Brad");
// const elenaChefCooker = new ChefCook("Elena");

///////////////////////////////////////////////////////////////////////////////////////////
// Будет с помощью класса Buttler сформироваться обьект такого вида
// const buttler = {
//   name: "Alfred",
//   chef: {
//     name: "Alex",
//     cookFood: (foodName: string) => {
//       return { name: foodName, tasty: true };
//     },
//   },
// };

class Buttler {
  public name: string;
  private chef: ChefCook;

  constructor(buttlerName: string, chefObj: ChefCook) {
    this.name = buttlerName;
    this.chef = chefObj;
  }

  bringFood(order: string) {
    const food = this.chef.cookFood(order);

    return { ...food, drink: "Orange Juice" };
  }
}

const freddyButler = new Buttler("Freddy", alexChefCooker);

// console.log(freddyButler);
// console.log(freddyButler.name);
// console.log(freddyButler.bringFood("Pizza"));
// console.log(freddyButler.bringFood("Pizza"));

class Queen {
  constructor(
    public name: string,
    private buttler: Buttler,
  ) {
    this.name = name;
    this.buttler = buttler;
  }

  breakfast(queenOrder: string) {
    return this.buttler.bringFood(queenOrder);
  }
}

const elizabethQueen = new Queen("Eliabeth", freddyButler);
console.log(elizabethQueen);
console.log(elizabethQueen.breakfast("Pizza"));

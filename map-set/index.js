const map1 = new Map();
console.log(map1);

map1.set(1, "a");
map1.set(2, "b");
map1.set(3, "c");

console.log(map1);

console.log(map1.get(2));
console.log(map1.has("c"));

for(const [k,v] of map1)
{
    console.log(`${k} : ${v}`);
}

console.log("==== weakmap ====");

const weakmap1 = new WeakMap();
console.log(weakmap1);

const privateData = new WeakMap();

class User {
  constructor(name, password) {
    privateData.set(this, { password });
    this.name = name;
  }

  checkPassword(pwd) {
    return privateData.get(this).password === pwd;
  }
}

const aa = new User("john","password");
console.log(aa.checkPassword("akakakak"));
console.log(aa.checkPassword("password"));



const set1 = new Set();
set1.add(56);
set1.add(26);
set1.add(48);
set1.add(16);
set1.add(56);
console.log(set1);
console.log(set1.delete(16));
console.log(set1);
console.log(set1.has(26));
console.log(set1.values());


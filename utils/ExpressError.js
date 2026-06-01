
class ExpressError extends Error{
    constructor(statuscode,message){
      super(message);
       this.message=message;
       this.statuscode=statuscode;
    }
}
module.exports = ExpressError;



// class Parent {
//     constructor(name, age) {
//       this.n = name;   // object ki property
//       this.g = age;
//       console.log(name);
//     }
  
//     show() {
//       console.log(this.n);
//       console.log(this.g);
//     }
//   }
  
//   class Child extends Parent {
//     constructor(name, age) {
//       super(name, age); // parent constructor call
//       this.name=name  
//       console.log(name)
      
//     }
//     // s(){
//     //     console.log(this.x)
//     //     console.log(this.y)
//     // }
//   }
  
//   const c = new Child("Rahul", 20);
//   c.show();
  

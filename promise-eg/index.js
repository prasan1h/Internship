// const order = new Promise((resolve , reject) => {


//     // let query = "SELECT * FROM orders WHERE id = 1";
//     // data = query.result;

//     let data = null;

//     if(data){
//         resolve(data);
//     }
//     else{
//         reject("no data");
//     }
// });


let loading = false;
let error = false;


// function loadData(){
    
//     loading = true;  
//     console.log("loading data..." + loading); 

//     order
//     .then((data) => console.log(data))
//     .catch((err) => {
//         console.log(err);
//         error = true;
//         console.log("error..." + error);
//     })
//     .finally(() => {console.log("final block"); loading = false;  console.log("loading data..." + loading);});
// }

// loadData();


const getData = new Promise((resolve, reject) => {
    // let data = fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = null;
    if(data){
        resolve(data);}
    else{
        reject("no data is fetched");
    }
});


const dataHandler = () => {
    loading = true;
    console.log("loading start : " + loading);
    getData
    .then((data) => {console.log(data); })
    .catch((err) => {console.log(err); error = true; console.log("error... : " + error);})
    .finally(() => {console.log("finally : "); loading = false; console.log("loading end : " + loading);});
}

dataHandler();


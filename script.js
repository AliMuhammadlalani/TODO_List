update();
let add=document.getElementById("add");
add.addEventListener("click",getandupdate);
function getandupdate(){
 console.log("Updating list...");
 tit=document.getElementById('title').value.trim();
 desc=document.getElementById('description').value.trim();
 if(tit !=='' && desc !==''){
 if(localStorage.getItem('itemsJson')==null){
   itemJsonArray=[];
   itemJsonArray.push([tit,desc]);
   localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
 }
 else{
   itemJsonArrayStr= localStorage.getItem('itemsJson');
   itemJsonArray=JSON.parse(itemJsonArrayStr);
   itemJsonArray.push([tit,desc]);
   localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
 }
 update();
 document.getElementById('title').value = "";
 document.getElementById('description').value = "";
}else{
 alert("Please enter both title and description."); 
 }
}

function update(){
 if(localStorage.getItem('itemsJson')==null){
   itemJsonArray=[];
   localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
 }
 else{
   itemJsonArrayStr= localStorage.getItem('itemsJson');
   itemJsonArray=JSON.parse(itemJsonArrayStr);
 }
 //Populate the table
 let tableBody=document.getElementById("tableBody");
 let str="";
 itemJsonArray.forEach(function(element,num){
   str += `     
   <tr>
         <th scope="row">${num+1}</th>
         <td>${element[0]}</td>
         <td>${element[1]}</td>
         <td><button id="buttn" type="button" onclick="deleted(${num})" class="btn btn-sm btn-primary">Delete</button>
         </td>
       </tr>  `;
 });
 tableBody.innerHTML=str;
}
function deleted(itemIndex){
 console.log("Delete",itemIndex);
 itemJsonArrayStr= localStorage.getItem('itemsJson');
 itemJsonArray=JSON.parse(itemJsonArrayStr);
 itemJsonArray.splice(itemIndex,1);
 localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
 update();
}     
function clearlist(){
 if(confirm("Do you really want to clear")){
 console.log("clearing the storage");
 localStorage.clear();
 update();
 }
}   
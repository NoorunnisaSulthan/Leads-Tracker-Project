let leadsArray=[];
const saveBtn=document.getElementById("saveBtn");
let list=document.getElementById("ul-el");
let deleteBtn=document.getElementById("delete")
let showAll=document.getElementById("showAll")
let history=[]

const tabBtn=document.getElementById("saveTabBtn");

if (!sessionStorage.getItem('visited')) {
    console.log('Page is being loaded for the first time');
    sessionStorage.setItem('visited', 'true');
    if(localStorage!=undefined){
        for(let i=0;i<localStorage.length;i++){
            const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    leadsArray.push(value)
    console.log(value);
        }
    }
  } else {
    console.log('Page is being reloaded');
  }
  
deleteBtn.addEventListener("click", function() {
   localStorage.clear()
   leadsArray=[]
history=[]
renderlist();
list.innerHTML="";
  
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs);
        leadsArray.push(tabs[0].url)
       
            localStorage[leadsArray.length]=JSON.stringify(tabs[0].url);
            
        list.innerHTML=""
        renderlist()
    })
})



saveBtn.addEventListener("click",()=>{
    let inputValue=document.getElementById("input").value;
    leadsArray.push(inputValue);
    document.getElementById("input").value = "";
    console.log(leadsArray);
    localStorage.setItem(leadsArray.length,JSON.stringify(inputValue));
   

list.innerHTML=""
renderlist();

})
showAll.addEventListener("click",()=>{
    list.innerHTML=""
    renderlist()
})
function renderlist() {
   
    
    
    for(let i=0;i<localStorage.length;i++){
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
   
        list.innerHTML+=`<li><a target="_blank" href="${value}">${value}</a></li>`
        
         
      }    
    
}



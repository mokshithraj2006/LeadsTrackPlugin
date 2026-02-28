let inputBtn =  document.getElementById("input-btn");
let myLeads = [];
const inputEL =  document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const dlBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn")
dlBtn.addEventListener("dblclick",function(){
    myLeads = []
    localStorage.clear()
    ulEl.innerHTML=""
})

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"))
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderLeads()
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myleads",JSON.stringify(myLeads))
    renderLeads()})
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEL.value)
    localStorage.setItem("myleads",JSON.stringify(myLeads))
    renderLeads()
    inputEL.value = ""

});

function renderLeads(){    
    let listitems = ""
    for(let i = 0; i < myLeads.length;i++){
        listitems+= `
        <li>
        <a target='_blank' href='${myLeads[i]}'>
        ${myLeads[i]}
        </a>
        </li>
        `
    }
    ulEl.innerHTML = listitems

}
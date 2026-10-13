
function list(name){
    let listtask=document.createElement("li")
    document.getElementById("list").appendChild(listtask)
    listtask.textContent=name

    let del=document.createElement("button")
    del.textContent="DELETE"
    del.onclick=()=>remove(listtask)
    listtask.appendChild(del)

    let completed=document.createElement("button")
    completed.textContent="TASK CLEARED"
    completed.onclick=()=>listtask.classList.toggle("done")
    listtask.appendChild(completed)
    count()
}
function taskinput(){
    let name=""
    let taskin=document.getElementById("task1")
    name=taskin.value.trim()
    if(name==="") 
        return
    list(name)
    taskin.value=""
}
function remove(task){
    task.remove()
    count()
}
function count(){
    let c=document.getElementById("list").children.length
    document.getElementById("count").innerHTML=c
}
let colors=["rgb(232, 221, 251)","rgb(194, 194, 243)","rgb(243, 229, 245)"]
let index=0

function color(){
    document.body.style.backgroundColor=colors[index]
    index=(index+1)%colors.length
}
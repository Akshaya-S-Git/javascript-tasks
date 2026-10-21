let detail=document.getElementById("details")
let expensename=document.getElementById("name")
let amount=document.getElementById("amount")
let category=document.getElementById("category")
let date=document.getElementById("date")
let table=document.getElementById("table")
let total=document.getElementById("total")
let categoryfilter=document.getElementById("categoryfilter")
let search=document.getElementById("search")
let sortdate=document.getElementById("sortdate")
let monthlyspending=document.getElementById("monthlyspending")
let numberofexpense=document.getElementById("numberofexpense")
let monthlybudget=document.getElementById("monthlybudget")
let set=document.getElementById("set")
let remaining=document.getElementById("remaining")
let budgetwarning = document.getElementById("budgetwarning")
let exportjson=document.getElementById("exportjson")
let importjson = document.getElementById("importjson")
let imports = document.getElementById("import")
let clearall = document.getElementById("clearall")

function totalvalue(a){
    let t=Number(total.textContent)
    t+=a
    total.textContent=t
}

import { ExpenseManager } from "./expensemanager.js"
let manager = new ExpenseManager()
let expenses = manager.expenses

let savedbudget = localStorage.getItem("budget")

if (savedbudget !== null) {
    monthlybudget.value = savedbudget
}

detail.addEventListener("submit", function(event){
    event.preventDefault()

    if (expensename.value.trim() ===""){
        return
    }
    let a=Number(amount.value)
    if (a<=0 || amount.value===""){
        return
    }
    if (category.value===""){
        return
    }
    if (date.value===""){
        return
    }

    let expense={id: Date.now(),name: expensename.value.trim(),amount:a ,category: category.value,date: date.value}
    let r=document.createElement("tr")
    r.innerHTML=`<td>${expense.name}</td>
                <td>${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>`
    manager.add(expense)
    expenses = manager.expenses

    let deletedata=document.createElement("td")
    let del=document.createElement("button")
    del.textContent="DELETE"
    del.addEventListener("click", function() {
        manager.remove(expense.id)
        expenses = manager.expenses
        
        display(expenses)
        
        total.textContent = expenses.reduce(function(sum, item) {
        return sum + Number(item.amount)}, 0)
    dashboard()
    })

    deletedata.appendChild(del)
    r.appendChild(deletedata)
    table.appendChild(r)

    totalvalue(a)
    dashboard()

    function reset(){
        detail.reset()
    }
    reset()

})

function display(data) {
    table.innerHTML = ""

    data.forEach(function(x) {
        let frow = document.createElement("tr")

        frow.innerHTML = `<td>${x.name}</td>
            <td>${x.amount}</td>
            <td>${x.category}</td>
            <td>${x.date}</td>`

        let deletedata = document.createElement("td")
        let del = document.createElement("button")

        del.textContent = "DELETE"

        del.addEventListener("click", function() {
            manager.remove(x.id)
            expenses = manager.expenses

            display(expenses)

            total.textContent = expenses.reduce(function(sum, item) {
                return sum + Number(item.amount)
            }, 0)

            dashboard()
        })

        deletedata.appendChild(del)
        frow.appendChild(deletedata)
        table.appendChild(frow)
    })
}

function Filters() {
    let filtered = expenses.filter(function(x) {
        let c=categoryfilter.value === "" ||x.category === categoryfilter.value

        let s=x.name.toLowerCase().includes(search.value.trim().toLowerCase())

        return c && s
    })
    if (sortdate.value === "new") {
        filtered.sort(function(a, b) {
            return b.date.localeCompare(a.date)
        })
    } else if (sortdate.value === "old") {
        filtered.sort(function(a, b) {
            return a.date.localeCompare(b.date)
        })
    }

    display(filtered)
}

categoryfilter.addEventListener("change", Filters)
search.addEventListener("input", Filters)
sortdate.addEventListener("change", Filters)


function dashboard(){
    let today=new Date()
    let month=today.getMonth()
    let year=today.getFullYear()
    
    let monthexpense=expenses.filter(function(x){
    let d=new Date(x.date)
    return d.getMonth()===month && d.getFullYear()===year
    })
    let monthtotal=monthexpense.reduce((sum,x) =>{
        return sum + Number(x.amount)
    },0)
    monthlyspending.textContent=monthtotal
    numberofexpense.textContent=monthexpense.length
    remaining.textContent=Number(monthlybudget.value)-Number(monthtotal)
    if (monthlybudget.value===""){
        budgetwarning.textContent = "Set a budget"
    }else if (monthtotal > Number(monthlybudget.value)) {
        budgetwarning.textContent = "Budget Exceeded!"
    } else {
        budgetwarning.textContent = "You can spend!"
    }
}

set.addEventListener("click", function() {
    localStorage.setItem("budget", monthlybudget.value)
    dashboard()
})

display(expenses)
total.textContent = expenses.reduce(function(sum, x) {
    return sum + Number(x.amount)}, 0)
dashboard()

exportjson.addEventListener("click", function(){
    let e=JSON.stringify(expenses,null,2)
    let blob=new Blob([e],{type:"application/json"})
    let url=URL.createObjectURL(blob)
    let a=document.createElement("a")
    a.href=url
    a.download="expenses.json"
    a.click()
    URL.revokeObjectURL(url)
})

imports.addEventListener("click", function() {
    let file = importjson.files[0]

    if (!file) {
        alert("Please select a JSON file")
        return
    }

    let reader = new FileReader()

    reader.onload = function() {
        try {
            let importedExpenses = JSON.parse(reader.result)
            if (!Array.isArray(importedExpenses)) {
                alert("Invalid file structure")
                return
            }
            let valid = importedExpenses.every(function(expense) {
                return expense &&
                Number.isSafeInteger(expense.id) &&
                typeof expense.name === "string" &&
                expense.name.trim() !== "" &&
                typeof expense.amount === "number" &&
                Number.isFinite(expense.amount) &&
                expense.amount > 0 &&
                ["FOOD", "TRAVEL", "SHOPPING", "OTHER"].includes(expense.category) &&
                /^\d{4}-\d{2}-\d{2}$/.test(expense.date) &&
                !isNaN(Date.parse(expense.date)) &&
                 new Date(expense.date).toISOString().slice(0, 10) === expense.date
            })

            if (!valid) {
                alert("Invalid expense data")
                return
            }
            let confirmImport = confirm("Do you want to replace your existing expenses?")
            if (!confirmImport) {
                return
            }
            manager.replace(importedExpenses)
            expenses = manager.expenses
            display(expenses)
            dashboard()
            total.textContent = expenses.reduce(function(sum, x) {
                return sum + Number(x.amount)}, 0)
            console.log("Expenses imported successfully!", expenses)
        } catch (error) {
            alert("Invalid JSON file")
        }
    }

    reader.readAsText(file)
})

clearall.addEventListener("click", function() {
    let confirmclear = confirm("Are you sure you want to delete all expenses?")
    if (!confirmclear) {
        return
    }
    manager.clear()
    expenses = manager.expenses
    display(expenses)
    total.textContent = 0
    dashboard()
    alert("All expenses cleared successfully!")
})


let inrAmount = document.getElementById("inrAmount")
let usdAmount = document.getElementById("usdAmount")
let convert = document.getElementById("convert")
let conversionMessage = document.getElementById("conversionMessage")

async function convertToUSD() {
    try {
        conversionMessage.textContent = "Getting exchange rate..."

        let response = await fetch("https://open.er-api.com/v6/latest/INR")

        if (!response.ok) {
            throw new Error("Could not get exchange rate")
        }

        let data = await response.json()
        let rate = data.rates.USD
        let spending = Number(monthlyspending.textContent)
        let dollars = spending * rate

        inrAmount.textContent = spending
        usdAmount.textContent = dollars.toFixed(2)
        conversionMessage.textContent = "Conversion successful!"
    } catch (error) {
        conversionMessage.textContent =
            "Conversion failed. Please try again."
        console.error(error)
    }
}

convert.addEventListener("click", convertToUSD)


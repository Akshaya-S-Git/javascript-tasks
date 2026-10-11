let a=[[1,"lays",20],[2,"chips",30],[3,"choco milkshake",50],[4,"rings chips",20],[5,"cake",25]]
function pattern(ino){
    let p=""
    for(let f1=1;f1<=ino;f1++){
    for(let f2=1;f2<=f1;f2++){
        p=p + f2
    }
    p= p + "\n"
}console.log(p)
}
function success(){
    for (let c=3;c>=1;c=c-1){
        if (c>=2){
            alert(c + "... " + "getting ready")
        }else{
            alert(c + "... " + "your item is ready to purchase")
        }
    }
}
function Change(amount,price){
    return amount - price
}  
let again=true 
while(again) {
for (let x=0;x<a.length;x++){
    console.log("ITEMNO: "+ a[x][0] + " ," + "ITEMNAME: "+ a[x][1] + " ," + "AMOUNT: Rs." + a[x][2])
}
let itemnum=Number(prompt("ENTER THE ITEM NUMBER"))
let found=false
for (let i=0;i<5;i++){
    if (a[i][0]==itemnum){
        found=true
        let b=Number(a[i][2])
        alert("THE ITEM NUMBER IS AVAILABLE")
        let amount=Number(prompt("ENTER THE AMOUNT OF MONEY YOU HAVE"))
        if (amount<0 || isNaN(amount)){
             alert("ENTER A VALID AMOUNT TO PURCHASE")
        }else if(amount<b){
             alert("INSUFFICIENT BALANCE CAN'T PURCHASE")
        }else if(amount==b){
            alert("NO CHANGE YOU GOOD TO GO")
            success()
            pattern(a[i][0])
        }else  {
            alert("YOU HAVE MORE MONEY THAN REQUIRED SO THE CHANGE IS" + " " + Change(amount,b))
            success()
            pattern(a[i][0])
        }
    }
}
if (found==false){
    alert("ENTER VALID ITEM NUMBER")
}
 again=confirm("DO YOU WANT TO PURCHASE AGAIN?")

}

alert("HAVE A NICE DAY");



    


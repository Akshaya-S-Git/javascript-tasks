let again=true
while (again){let number=Number(prompt("ENTER A NUMBER"))

if(number<=0){
    alert("THE ENTERED NUMBER IS NOT A VALID NATURAL NUMBER")
}else if ((number%2)==0){
    alert("THE ENTERED NUMBER IS EVEN")
    for (let i=1;i<=5;i++){
        let square=""
        for (let j=1;j<=5;j++){
            square=square+"*"
        }
        console.log(i + ":" + square)
    }
    let sum=0
    for (let p=1;p<=number;p++){
    sum=sum + p
    }alert("THE SUM OF NATURAL NUMBERS UPTO TO" + " " + number + " " + "IS" + " "+ sum)

}else {
    alert("THE ENTERED NUMBER IS ODD")
    let triangle=""
    for (let k=1;k<=5;k++){
        triangle+="*"
        console.log(triangle)
    }
    let sum=0
    for (let p=1;p<=number;p++){
    sum=sum + p
    }alert("THE SUM OF NATURAL NUMBERS UPTO TO" + " " + number + " " + "IS" + " "+ sum)

}
function table(){
    let s=" "
    for (let x=1;x<=10;x++){
        for(let y=1;y<=10;y++){
            s+=x + "x" + y + "=" + (x*y) + "\n"
        }
        
    }
    return s 
}
console.log(table())
again=confirm("DO WANT TO CONTINUE AGAIN")
}
alert("COMPLETED...")

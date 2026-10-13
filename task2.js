let name2=true
while (name2){
let sname=prompt("ENTER STUDENT NAME")
function avg(mark1,mark2,mark3){
    return (mark1+mark2+mark3)/3
}
let mark1=Number(prompt("ENTER MARK 1"))
if (mark1>100 || mark1<0 ){
    alert("INVALID MARK") 
    name2=confirm("DO YOU WANT CHECK ANOTHER STUDENT'S RESULT?")
    continue
}
let mark2=Number(prompt("ENTER MARK2"))
if (mark2>100 || mark2<0 ){
    alert("INVALID MARK")
    name2=confirm("DO YOU WANT CHECK ANOTHER STUDENT'S RESULT?")
    continue
}
let mark3=Number(prompt("ENTER MARK3"))
if (mark3>100 || mark3<0){
    alert("INVALID MARK")
    name2=confirm("DO YOU WANT CHECK ANOTHER STUDENT'S RESULT?")
    continue
}else{
let average=avg(mark1,mark2,mark3).toFixed(2)
alert("THE AVERAGE IS" + " " + average )
if (average>=90){
    alert("NAME: " + sname + ", " +"TOTALMARKS: " + (mark1+mark2+mark3) + ", " + "AVERAGE: " + average + ", " + "GRADE: A")
}else if (average>=75){
    alert("NAME: " + sname + ", " +"TOTALMARKS: " + (mark1+mark2+mark3) + ", " + "AVERAGE: " + average + ", " + "GRADE: B")
}else if (average>=50){
    alert("NAME: " + sname + ", " +"TOTALMARKS: " + (mark1+mark2+mark3) + ", " + "AVERAGE: " + average + ", " + "GRADE: C")

}else if (average>=0){
    alert("NAME: " + sname + ", " +"TOTALMARKS: " + (mark1+mark2+mark3) + ", " + "AVERAGE: " + average + ", " + "GRADE: F")

}else {
    alert("INVALID MARK")
}
}
name2=confirm("DO YOU WANT CHECK ANOTHER STUDENT'S RESULT?")

}
alert("THANKYOU")

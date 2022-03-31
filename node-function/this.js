console.log(this)  //전역스코프의 this는 빈객체.
console.log(this===module.exports)
function a(){
    console.log(this===global)

}
a();
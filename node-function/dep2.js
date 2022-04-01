const dep1= require('./dep1');
console.log('require dep1',dep1);
module.exports=()=>{
    console.log('dep1',dep1);
}

// 순환 참조가 발생하면 dep1의 내용을 빈객체로 만들어 차단해버린다.
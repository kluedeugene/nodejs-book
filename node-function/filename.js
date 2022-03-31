console.log(__filename)
console.log(__dirname)

exports.odd= odd;
exports.even =even;

// module.exports={         2가지 이상을 다루고싶을시에는 위 방법 혹은 이방법.
//     odd,
//     even,
// }

// module.exports=checkOddEven  이와같이 한가지 함수만을 넣을떄는 이와같이 사용가능.

// exports.odd= odd;
//위와같이 사용하고,
// module.exports={}
// 이렇게 다시 새로운 객체를 생성해서 사용하면  module.exports !==exports .즉 참조관계가  끊겨버리게되므로 둘다 같이 사용하지않는다.
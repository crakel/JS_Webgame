//var 후보군 = Array(45);
// var 필 = 후보군.fill(); //fill을 쓰면 forEach 가능

// 필.forEach(function(요소, 인덱스) {
//     필[인덱스] = 인덱스+1;
// });
var 후보군 = Array(45).fill().map(function(요소, 인덱스) {
    return 인덱스+1;
});

var 셔플 = [];
while (후보군.length > 0) {
    var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
    셔플.push(이동값);
}

var 보너스 = 셔플[셔플.length -1];
var 당첨숫자들 = 셔플.slice(0, 6).sort(function (p,c) { return p -c;});
//0부터 5까지 (6포함x)


// sort 콜백함수 : p,c뺀수가 양수면 자리를바꿈 (return값)


// for (var i=0; i<당첨숫자들.length; i+=1) {  //반복문 안에 비동기사용시 -> 클로저문제
//     setTimeout(function 비동기콜백함수() {
//     var 공 = document.createElement('div');
//     공.textContent = 당첨숫자들[i];
//     결과창.appendChild(공);
//     }, 1000); // 밀리초
// }

//var 결과창 = document.getElementById('결과창');
var 결과창 = document.querySelector('#결과창');

function 공색칠하기(숫자, 결과창) {
    var 공 = document.createElement('div');
    공.textContent = 숫자;
    공.style.display = 'inline-block';
    공.style.border = '1px solid black';
    공.style.borderRadius = '10px';
    공.style.width = '20px';
    공.style.height = '20px';
    공.style.textAlign = 'center';
    공.style.marginRight = '10px';
    공.style.fontSize = '12px';
    // 자바스크립트에서 class -> className 이용
    // 공.className = '공아이디' + 숫자;
    var 배경색;
    if (숫자 <= 10) {
        배경색 = 'red';        
    } else if (숫자 <= 20) {
        배경색 = 'orange';
    } else if (숫자 <= 30) {
        배경색 = 'yellow';
    } else if (숫자 <= 40) {
        배경색 = 'blue';
        공.style.color = 'white';
    } else {
    배경색 = 'green';
    }
    공.style.background = 배경색; 
    결과창.appendChild(공);
}

// 클로저 문제 발생 (setTimeout이 실행되기전에 i가 당첨숫자들.length가 되어버린다.)
// for (var i=0; i<당첨숫자들.length; i++) {
//     setTimeout(function() {
//         공색칠하기(당첨숫자들[i], 결과창);
//     }, (i+1)*1000);
// }

// 클로저 수정
for (var i=0; i<당첨숫자들.length; i++) {
   (function 클로저(j) {
    setTimeout(function() {
        공색칠하기(당첨숫자들[j], 결과창);
        }, (j+1)*1000);
    })(i); // 괄호쳐서 즉시실행 함수
}     


// setTimeout(function 비동기콜백함수() {
//     공색칠하기(당첨숫자들[0], 결과창);
// }, 1000);

// setTimeout(function 비동기콜백함수() {
//     공색칠하기(당첨숫자들[1], 결과창);
// }, 2000);

// setTimeout(function 비동기콜백함수() {
//     공색칠하기(당첨숫자들[2], 결과창);
// }, 3000);

// setTimeout(function 비동기콜백함수() {
//     공색칠하기(당첨숫자들[3], 결과창);
// }, 4000);

// setTimeout(function 비동기콜백함수() {
//     공색칠하기(당첨숫자들[4], 결과창);
// }, 5000);

// setTimeout(function 비동기콜백함수() {
//     공색칠하기(당첨숫자들[5], 결과창);
// }, 6000);

setTimeout(function 비동기콜백함수() {
    //var 칸 = document.getElementsByClassName('보너스')[0]; //클래스는 여러개있기때문
    var 칸 = document.querySelector('보너스');
    공색칠하기(보너스, 칸);
}, 7000);

// 여러 태그 동시 선택 => querySelectorAll

// 내가 숫자 뽑아서 당첨숫자 맞춰서 몇등인지



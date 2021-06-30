
var 이미지좌표 = 0;
var 가위바위보 = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};
function 컴퓨터의선택(이미지좌표){
    return Object.entries(가위바위보).find(function(v) {
    return v[1] === 이미지좌표;
    })[0];
}
// Object.entries(객체)로 객체를 배열로 바꿀 수 있다.
//배열.find는 반복문이지만 원하는 것을 찾으면 return이 멈춘다. 
//일차원배열일때는  indexof 이차원배열 find, findIndex 를 씀 


var 인터벌;
function 인터벌메이커() {
    인터벌 = setInterval(function () { //화살표 함수 //setTime 과 다르게 게속 실행하는것 100=>반복되는간격
        if (이미지좌표 === 가위바위보.바위){
            이미지좌표 = 가위바위보.가위;
        } else if (이미지좌표 === 가위바위보.가위) {
            이미지좌표 = 가위바위보.보;
        } else {
            이미지좌표 = 가위바위보.바위;
        }
        document.querySelector('#computer').style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + 이미지좌표 + ' 0';
    }, 100);
}

인터벌메이커();

var 점수표 = {
    가위: 1,
    바위: 0,
    보: -1,
};

//qSAll 하면 반복문으로 돌려줘야함
document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        clearInterval(인터벌); //인터벌 멈추기
        setTimeout(function() {
            인터벌메이커();
        }, 1000);
        
        var 나의선택 = this.textContent;
        var 나의점수 = 점수표[나의선택];
        var 컴퓨터점수 = 점수표[컴퓨터의선택(이미지좌표)];
        var 점수차 = 나의점수 - 컴퓨터점수;
        console.log(나의선택, 컴퓨터의선택(이미지좌표));
        if (점수차 === 0) {
            console.log('비겼습니다.');
        } else if ([-1, 2].includes(점수차)) { 
            //배열.includes를 이용한 || 관계 줄이기 
            console.log('이겼습니다!!');
        } else {
            console.log('졌습니다 ㅠㅠ.');
        }
        // if (나의선택 ==='가위') {
        //     if (컴퓨터의선택(이미지좌표) === '가위') {
        //         console.log('비겼습니다.');
        //     } else if (컴퓨터의선택(이미지좌표) === '바위') {
        //         console.log('졌습니다 ㅠㅠ.');
        //     } else {
        //         console.log('이겼습니다!!');
        //     }
        // } else if (나의선택==='바위') {
        //     if (컴퓨터의선택(이미지좌표) === '바위') {
        //         console.log('비겼습니다.');
        //     } else if (컴퓨터의선택(이미지좌표)=== '가위') {
        //         console.log('졌습니다 ㅠㅠ.');
        //     } else {
        //         console.log('이겼습니다!!');
        //     }
        // } else if (나의선택 ==='보') {
        //     if (컴퓨터의선택(이미지좌표) === '보') {
        //         console.log('비겼습니다.');
        //     } else if (컴퓨터의선택(이미지좌표) === '바위') {
        //         console.log('졌습니다 ㅠㅠ.');
        //     } else {
        //         console.log('이겼습니다!!');
        // }
        // }
    });
});

// 규칙찾기
// 나\컴퓨터       가위    바위    보
//           가위  1 1    1 0   1 -1
//           바위  0 1    0 0   0 -1
//            보  -1 1   -1 0  -1 -1
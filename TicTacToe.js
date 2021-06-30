var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');

function 결과체크(몇줄, 몇칸) {
    // 세칸 다 채워졌나?
    var 다참 = false;
    // 가로줄 검사
        if (칸들[몇줄][0].textContent === 턴 &&
            칸들[몇줄][1].textContent === 턴 &&
            칸들[몇줄][2].textContent === 턴)
        {
            다참 = true;
        }
        // 세로줄 검사
        if (칸들[0][몇칸].textContent === 턴 &&
           칸들[1][몇칸].textContent === 턴 &&
           칸들[2][몇칸].textContent === 턴)
        {
            다참 = true;
        }
        // 대각선 검사
        if(칸들[0][0].textContent === 턴 &&
           칸들[1][1].textContent === 턴 &&
           칸들[2][2].textContent === 턴) 
        {
            다참 = true;
        }
        
        if(칸들[0][2].textContent === 턴 &&
           칸들[1][1].textContent === 턴 &&
           칸들[2][0].textContent === 턴) 
        {
            다참 = true;
        }
    return 다참;
}

function 초기화(무승부) { // 초기화
    if (무승부) {
        결과.textContent = '무승부';
    } else {
        결과.textContent = 턴 + '님이 승리!';
    }
    setTimeout(function() {
        결과.textContent = '';
        칸들.forEach(function (줄){
            줄.forEach(function(칸){
                칸.textContent ='';
            });
        });
        턴 = 'X';
    }, 1000);     
}
// 무승부일때 안만듬 ㅠ

var 비동기콜백 = function(이벤트) { // 칸을 클릭했을때
    if (턴 === 'O'){ // 컴퓨터의 턴일 때 내가 클릭하지 않도록
        return; // 클릭이 실행되지 않는다.
    }
    var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
    console.log('몇줄', 몇줄);
    var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);
    console.log('몇칸', 몇칸);
    
    if (칸들[몇줄][몇칸].textContent !== '') {
        console.log('빈칸아님');
    } else {
        console.log('빈칸임');
        칸들[몇줄][몇칸].textContent = 턴;
        var 다참 = 결과체크(몇줄, 몇칸);
        // 모든 칸이 다 찼는지 검사
        var 후보칸 = [];
        칸들.forEach(function (줄) {
            줄.forEach(function (칸) {
                후보칸.push(칸);
            });
        });
        후보칸 = 후보칸.filter(function (칸) { return !칸.textContent }); // '', 0, NaN, undefined, null, false
        // 다 찼으면
        if (다참) {
            //초기화
            초기화(); // undefined가 false
        } else if (후보칸.length === 0) { // 칸을 더이상 선택할 수 없음 (무승부)
            초기화(true);
        } else { //다 안 찼으면 
            if (턴 === 'X') {
                턴 = 'O';
            }
        
            setTimeout(function() {
                console.log('컴퓨터의 턴입니다.');
                // 빈 칸 중 하나를 고른다.
                
                
                var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
                선택칸.textContent = 턴;
                // 컴퓨터가 승리했는지 체크
                var 몇줄 = 줄들.indexOf(선택칸.parentNode);
                var 몇칸 = 칸들[몇줄].indexOf(선택칸);
                var 다참 = 결과체크(몇줄, 몇칸);
                // 다 찼으면
                if (다참) { // 컴퓨터가 이겼을 경우
                    초기화();
                }
                // 턴을 나한테 넘긴다.
                턴 = 'X';
            }, 1000);
        }
    }
};

for (var i=1; i<=3; i+=1) {
    var 줄 = document.createElement('tr');
    줄들.push(줄);
    칸들.push([]);
    for (var j=1; j<=3; j+=1) {
        var 칸 = document.createElement('td');
        칸.addEventListener('click', 비동기콜백);
        칸들[i-1].push(칸);
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}

바디.appendChild(테이블);
바디.appendChild(결과);
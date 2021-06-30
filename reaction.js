var 스크린 = document.querySelector('#screen');
var 시작시간; // = undefined 
var 끝시간;
var 기록 = [];
var 타임아웃;

var 상태 = {
    
};

스크린.addEventListener('click', function() {
    
    if (스크린.classList.contains('waiting')) {
       스크린.classList.remove('waiting');
       스크린.classList.add('ready');
       스크린.textContent = '초록색이 되면 클릭하세요.';
        타임아웃 = setTimeout(function() {
            시작시간 = new Date(); // performance.now(); => 보다 정밀한 소숫점
            스크린.click(); // 시간지나면 자동으로 클릭이 된다
       }, Math.floor(Math.random() * 1000) + 2000); // 2000 ~ 3000 사이 수 랜덤
   } else if (스크린.classList.contains('ready')) { // 준비 상태
       if (!시작시간) { //부정 클릭 undefined, 0, NaN, null, false, ''
           clearTimeout(타임아웃); // setTimeout 취소할수있음.
           스크린.classList.remove('ready');
           스크린.classList.add('waiting');
           스크린.textContent = '너무 성급하시군요!';
        } else {
       스크린.classList.remove('ready');
       스크린.classList.add('now');
       스크린.textContent = '클릭하세요!';
        }
   } else if (스크린.classList.contains('now')) {
       끝시간 = new Date();
       console.log('반응속도', 끝시간-시작시간, 'ms');
       기록.push(끝시간 - 시작시간);
       시작시간 = null; //이거 초기화안해도 초기화가 되는데?? -> 부정클릭때문에 초기화 필요
       끝시간 = null;
       스크린.classList.remove('now');
       스크린.classList.add('waiting');    
       스크린.textContent = '클릭해서 시작하세요.';
   }    
});
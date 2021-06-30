var tbody = document.querySelector('#table tbody');
var dataset = [];
var 중단플래그 = false;
var 열은칸 = 0;
var 코드표 = {
    연칸: -1,
    물음표: -2,
    깃발: -3,
    깃발지뢰: -4,
    물음표지뢰: -5,
    지뢰: 1,
    보통칸: 0,
}

//실행 눌렀을때
document.querySelector('#exec').addEventListener('click', function() {
    tbody.innerHTML = ''; // 실행할때마다 내부 html 초기화
    중단플래그 = false;
    열은칸 = 0;
    dataset = []; // dataset도 새로 초기화
    document.querySelector('#result').textContent = '';
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    
    // 지뢰 위치 뽑기
    var 후보군 = Array(hor * ver).fill().map(function(요소, 인덱스) {
    return 인덱스; // 외워두는게 좋다.
});

    var 셔플 = [];
    while (후보군.length > hor * ver - mine) {
        var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
        셔플.push(이동값);
    }
    
    
    // 지뢰 테이블 만들기
    for (var i=0; i<ver; i+=1) {
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for (var j=0; j<hor; j+=1) {
            arr.push(코드표.보통칸); // 기본값 (안열린상태) 0
            var td = document.createElement('td');
            // 오른쪽 클릭
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                if (중단플래그) {
                    return;
                }
                console.log(e.currentTarget);
                console.log(td);
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget); // 부모tr.children.indexOf(e.currentTarget); 이거왜 td로 하면 안되고 e.currentTarget 만 되냐 ->td가 여러개여서 특정지을수가없다.
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr); // 부모tbody.children.indexOf(부모tr);
                
                //console.log(부모tr, 부모tbody, e.currentTarget, 칸, 줄);
                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');
                    if (dataset[줄][칸] === 코드표.지뢰) {
                        dataset[줄][칸] = 코드표.깃발지뢰;
                    } else {
                        dataset[줄][칸] = 코드표.깃발;
                    }
                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if (dataset[줄][칸] === 코드표.깃발지뢰) {
                        dataset[줄][칸] = 코드표.물음표지뢰;
                    } else {
                        dataset[줄][칸] = 코드표.물음표;
                    }
                } else if (e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if (dataset[줄][칸] === 코드표.지뢰 || dataset[줄][칸] === 코드표.깃발지뢰 || dataset[줄][칸] === 코드표.물음표지뢰) {
                        e.currentTarget.textContent ='X';
                        dataset[줄][칸] = 코드표.지뢰;
                    } else {
                        e.currentTarget.textContent ='';
                        dataset[줄][칸] = 코드표.보통칸;
                    }
                }
            });
            // 왼쪽 클릭
            td.addEventListener('click', function (e) {
                if (중단플래그) {
                    return; // 플래그로 함수의 실행을 멈춤
                }
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                console.log(dataset, 줄, 칸);
                if ([코드표.연칸, 코드표.깃발, 코드표.깃발지뢰, 코드표.물음표지뢰, 코드표.물음표].includes(dataset[줄][칸]))  { // 또는 이 많을때 includes 이용
                    return; //열려있으면 종료
                }
                
                // 클릭했을때
                e.currentTarget.classList.add('opened');
                열은칸 += 1;
                // 클릭했을때 주변 지뢰 개수
                if (dataset[줄][칸] === 코드표.지뢰) {
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = '실패';
                    중단플래그 = true;
                } else {
                    var 주변 = [ dataset[줄][칸-1], dataset[줄][칸+1] ]; //칸이없을수도있지않나? 줄이없을때 오류떄문에 하는건데 칸은왜?
                    if (dataset[줄-1]) { //존재하면?
                        console.log(dataset[줄-1])
                        주변 = 주변.concat([dataset[줄-1][칸-1], dataset[줄-1][칸], dataset[줄-1][칸+1]]);
                        console.log(주변);
                        // console.log(dataset[줄-1][칸+1])// concat => 배열 합쳐서 새로운 배열 만듦
                    }
                    
                    if (dataset[줄+1]) {
                        console.log(dataset[줄+1])
                        주변 = 주변.concat([dataset[줄+1][칸-1], dataset[줄+1][칸], dataset[줄+1][칸+1]]);
                    }
                    
                    // 숫자 표시 
                    var 주변지뢰개수 = 주변.filter(function (v){ // 배열 filter 매소드, X인 값만 걸러내서 새로운 배열 리턴
                        return [코드표.지뢰, 코드표.깃발지뢰, 코드표.물음표지뢰].includes(v);
                    }).length;
                    // 거짓인 값 : false, '', 0, null, undefined, NaN
                    e.currentTarget.textContent = 주변지뢰개수 || ''; // 앞이 거짓인 값이면 뒤에것을 대신 쓴다.
                    dataset[줄][칸] = 코드표.연칸;
                    if (주변지뢰개수 === 0) {
                        // 주변 8칸 동시 오픈
                        console.log('주변을 엽니다');
                        var 주변칸 = [];
                        if (tbody.children[줄-1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄-1].children[칸-1],
                                tbody.children[줄-1].children[칸],
                                tbody.children[줄-1].children[칸+1],
                            ]);
                        }
                        주변칸 = 주변칸.concat([
                            tbody.children[줄].children[칸-1],
                            tbody.children[줄].children[칸+1],
                        ]);
                        
                        if (tbody.children[줄+1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄+1].children[칸-1],
                                tbody.children[줄+1].children[칸],
                                tbody.children[줄+1].children[칸+1],
                            ]);
                        }
                        // !!v 는 0이나 undefined 같이 필요없는 값들을 filtering 해준다.
                        주변칸.filter(function (v) { return !!v }).forEach(function(옆칸) {
                            var 부모tr = 옆칸.parentNode;
                            var 부모tbody = 옆칸.parentNode.parentNode;
                            var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
                            var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                            
                            if (dataset[옆칸줄][옆칸칸] !== 코드표.연칸) {
                            옆칸.click(); //옆칸을 넘기고 다시 click 재귀
                            }
                        });
                    }
                }
                console.log(열은칸, hor * ver - mine);
                if (열은칸 === hor * ver - mine) {
                    중단플래그 = true;
                    document.querySelector('#result').textContent = '승리!';
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    
    // 지뢰 심기  
    for (var k=0; k<셔플.length; k++) { // 예 59
        var 세로 = Math.floor(셔플[k] / ver); // 예 6줄->5줄
        var 가로 = 셔플[k] % ver; // 예 9칸 -> 8칸
        tbody.children[세로].children[가로].textContent = 'X';
        dataset[세로][가로] = 코드표.지뢰;
    }
});


// target 과 e.currentTarget 의 차이
// target은 실제 이벤트가 발생하는 것
// e.currentTarget은 이벤트리스너를 달아준 대상
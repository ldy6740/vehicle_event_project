//기간 선택
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/l10n/ko";
import "flatpickr/dist/themes/airbnb.css"


flatpickr("#start-day", {
	locale: "ko",
	mode: "range",
	dateFormat: "Y-m-d",
	maxDate: "today",
	onChange: (selectedDates, dateStr, instance) => {
		console.log(selectedDates);
		console.log(dateStr);
		console.log(instance);
	}
});


// kakao map 
var mapContainer = document.getElementById('map') // 지도를 표시할 div 
var mapOption = { 
		center: new kakao.maps.LatLng(35.48201, 129.351578), // 지도의 중심좌표
		level: 7 // 지도의 확대 레벨
};

		// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 


let START_TIME = ""; //시작 시간
let END_TIME = ""; // 종료 시간

let testArrar = [];


// 현재 시간 조회 함수
function getCurrentTime() {
	let checkTime = "";

	let today = new Date();

	let year = today.getFullYear() //년
	let month = today.getMonth() < 10 ? `0${today.getMonth() + 1}`: today.getMonth() + 1; // 월
	let date = today.getDate() < 10 ? `0${today.getDate()}`: today.getDate(); // 일

	let hours = today.getHours() < 10 ? `0${today.getHours()}`: today.getHours(); // 시
	let minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}`: today.getMinutes();  // 분
	let seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}`: today.getSeconds();  // 초



	return checkTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

// 조회 버튼을 클릭이벤트 감지
const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();

	// 최초 시작 시간 설정
	START_TIME = getCurrentTime();

	// 차량 운행 데이터 조회 시작
	searchBtn();
});

// 조회 버튼 클릭
function searchBtn() {
	let vehicleNumber = document.querySelector('#vehicle-number').value;
	// let vehicleDate = document.querySelector('#vehicle-date').value;

	// 최초 조회 버튼을 눌렀을때 end tiem 설정
	END_TIME = START_TIME;

	// 조회 버튼 눌렀을때 실행
	getCoordinates(vehicleNumber, START_TIME, END_TIME);
	console.log(Date.parse(START_TIME));


	// console.log(vehicleNumber);
	// 실시간인 경우 3초에 한번씩 자동 조회
	// setInterval(() => {
	// 	START_TIME = END_TIME;

	// 	END_TIME = getCurrentTime();

	// 	getCoordinates(vehicleNumber, START_TIME, END_TIME);
	// }, 10000);
	
}


// 차량 accelerometer 운행 데이터 조회 함수
async function getCoordinates(vehicleNumber, startTime, endTime) {
	const uri = "http://localhost:3000/event/accelerometer";
	const params = {
		"number":`${vehicleNumber}`,
		// "starttime": "2024-10-25 15:06:06.000",
		// "endtime": "2024-10-25 15:06:06.000",
		"starttime": startTime,
		"endtime": endTime,
	}
	const queryString = new URLSearchParams(params).toString();
	const requrl = `${uri}?${queryString}`;
	try {
		// fetch API를 이용하여 api 호출
		const response = await fetch(requrl, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			}
		}); 
	
		const data = await response.json();
		console.log(data);
	
		//운행 데이터 조회하여 좌표 값 데이터 가공
		var coordinatesValue = data.map((items, index) => {
			// data에서 좌표값만 답기
			let lat = items.GPS_Latitude;
			let lon = items.GPS_Longitude
			
			//자표값을 배열 형태로 반환
			return new kakao.maps.LatLng(lat, lon);
		});

		testArrar.push(...coordinatesValue);

		console.log()

	
	} catch (error) {
		console.log(error);
		// alert("존재하는 데이터가 없습니다.")
	}


	console.log(testArrar);
	

	//	지도에 선을 표시한다 
	var polyline1					=	new kakao.maps.Polyline({
		map									:	map, 										// 선을 표시할 지도 객체 
		path								:	testArrar,							//	선을 구성하는 좌표 배열
		strokeWeight				:	10,											//	선의 두께
		strokeColor					:	"#FF0000",							//	선 색
		strokeOpacity				:	0.9,										//	선 투명도
		strokeStyle					:	"solid"									//	선 스타일
	});

}

var positions					=
[
	{
		title					:	"A0001 김길동",
		latlng					:	new kakao.maps.LatLng(35.481937, 129.355698)
	}
];

//	마커 이미지의 이미지 주소입니다
var imageSrc					=	"https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

for ( var i = 0; i < positions.length; i++ )
{
	//	마커 이미지의 이미지 크기 입니다.
	var imageSize				=	new kakao.maps.Size(24, 35);

	//	마커 이미지를 생성합니다.
	var markerImage				=	new kakao.maps.MarkerImage(imageSrc, imageSize);

	//	마커를 생성합니다.
	var marker					=	new kakao.maps.Marker({
		map						:	map,																	//	마커를 표시할 지도
		position			:	positions[i].latlng,													//	마커를 표시할 위치
		title					:	positions[i].title,														//	마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다.
		image					:	markerImage																//	마커 이미지
	});
}
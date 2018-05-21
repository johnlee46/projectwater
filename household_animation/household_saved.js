var canvas1 = document.getElementById("canvas1"),
    ctx1 = canvas1.getContext("2d"),
		canvas2 = document.getElementById("canvas2"),
		ctx2 = canvas2.getContext("2d"),
		house = document.getElementById("house");
    f1 = document.getElementById("faucet_full1"),
    f2 = document.getElementById("faucet_full2"),
    f3 = document.getElementById("faucet_full3"),
    f4 = document.getElementById("faucet_full4"),
    d1 = document.getElementById("faucet_drip1"),
    d2 = document.getElementById("faucet_drip2"),
    d3 = document.getElementById("faucet_drip3"),
    d4 = document.getElementById("faucet_drip4"),
    d5 = document.getElementById("faucet_drip5"),
    d6 = document.getElementById("faucet_drip6"),
    d7 = document.getElementById("faucet_drip7"),
    d8 = document.getElementById("faucet_drip8"),
    d9 = document.getElementById("faucet_drip9"),
    curFrame1 = 0,
    outFrame1 = f1,
		curFrame2 = 0,
		outFrame2 = f1;

function setup(input1, input2) {
	if(input1 == 0 || input1 == 1){
		setInterval(drawFaucet1, 1000);
	}else if(input1 == 2 || input1 == 3){
		setInterval(drawDrip1, 250);
	}else if(input1 == 4 || input1 == 5){
		ctx1.drawImage(house, 0,0,725,617);
	}
	if(input2 == 0 || input2 == 1){
		setInterval(drawFaucet2, 1000);
	}else if(input2 == 2 || input2 == 3){
		setInterval(drawDrip2, 250);
	}else if(input2 == 4 || input2 == 5){
		ctx2.drawImage(house, 0,0,725,617);
	}
}
function drawFaucet1() {
  if(curFrame1 == 0){
    outFrame1 = f1;
    curFrame1++;
  }else if(curFrame1 == 1){
    outFrame1 = f2;
    curFrame1++;
  }else if(curFrame1 == 2) {
    outFrame1 = f3;
    curFrame1++;
  }else if(curFrame1 == 3) {
    outFrame1 = f4;
    curFrame1 = 0;
  }
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  ctx1.drawImage(outFrame1, 0, 0, canvas1.width, canvas1.height);
}

function drawFaucet2() {
  if(curFrame2 == 0){
    outFrame2 = f1;
    curFrame2++;
  }else if(curFrame2 == 1){
    outFrame2 = f2;
    curFrame2++;
  }else if(curFrame2 == 2) {
    outFrame2 = f3;
    curFrame2++;
  }else if(curFrame2 == 3) {
    outFrame2 = f4;
    curFrame2 = 0;
  }
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  ctx2.drawImage(outFrame2, 0, 0, canvas2.width, canvas2.height);
}

function drawDrip1() {
  if(curFrame1 == 0){
    outFrame1= d1;
    curFrame1++;
  }else if(curFrame1== 1){
    outFrame1= d2;
    curFrame1++;
  }else if(curFrame1== 2) {
    outFrame1= d3;
    curFrame1++;
  }else if(curFrame1== 3) {
    outFrame1= d4;
    curFrame1++;
  }else if(curFrame1== 4) {
    outFrame1= d5;
    curFrame1++;
  }else if(curFrame1== 5) {
    outFrame1= d6;
    curFrame1++;
  }else if(curFrame1== 6) {
    outFrame1= d7;
    curFrame1++;
  }else if(curFrame1== 7) {
    outFrame1= d8;
    curFrame1++;
  }else if(curFrame1== 8) {
    outFrame1= d9;
    curFrame1= 0;
  }
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  ctx1.drawImage(outFrame1, 0, 0, canvas1.width, canvas1.height);
}

function drawDrip2() {
  if(curFrame2 == 0){
    outFrame2= d1;
    curFrame2++;
  }else if(curFrame2== 1){
    outFrame2= d2;
    curFrame2++;
  }else if(curFrame2== 2) {
    outFrame2= d3;
    curFrame2++;
  }else if(curFrame2== 3) {
    outFrame2= d4;
    curFrame2++;
  }else if(curFrame2== 4) {
    outFrame2= d5;
    curFrame2++;
  }else if(curFrame2== 5) {
    outFrame2= d6;
    curFrame2++;
  }else if(curFrame2== 6) {
    outFrame2= d7;
    curFrame2++;
  }else if(curFrame2== 7) {
    outFrame2= d8;
    curFrame2++;
  }else if(curFrame2== 8) {
    outFrame2= d9;
    curFrame2= 0;
  }
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  ctx2.drawImage(outFrame2, 0, 0, canvas2.width, canvas2.height);
}

function animateFaucet(){
  setInterval(drawFaucet, 1000);
}

function animateDrip(){
  setInterval(drawDrip, 250);
}
"use strict";
const stopButton = document.getElementById("stop");
const restartButton = document.getElementById("restart");
restartButton.style.visibility = "hidden";
var canvas = document.getElementById("cv");
const apologyDivided = document.getElementById("apology");
if (canvas.getContext) var ctx = canvas.getContext("2d");
else {
	const apologyParagraph = apologyDivided.getContext("p");
	apologyParagraph.innerText = "このブラウザには対応していません！"
}
const resultDivided = document.getElementById("result");
const tweetDivided = document.getElementById("tweet");

var count = 0;
var proportion;
function move() {
	ctx.clearRect(0, 0, 300, 250);
	count++;
	count %= 75;
	// proportion: 電源ボタンの割合(0〜1)
	proportion = (Math.cos(2 * count * Math.PI / 75) + 1) / 2;
	ctx.beginPath();
	ctx.moveTo(150, proportion * 40 + (1 - proportion) * 20);
	ctx.lineTo(150, proportion * 115 + (1 - proportion) * 60);
	ctx.stroke();
	ctx.beginPath();
	var argStart = proportion * (-7 * Math.PI / 18) + (1 - proportion) * (-Math.PI / 2);
	var argEnd = proportion * (-11 * Math.PI / 18) + (1 - proportion) * (-Math.PI / 2);
	ctx.arc(150, 130, 70, argStart, argEnd);
	ctx.stroke();
}
var interval = setInterval(move, 10);

function removeAllChildren(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
	return;
}

stopButton.onclick = () => {
	clearInterval(interval);
	removeAllChildren(resultDivided);
	var dengen = Math.round(proportion*100);
	var kajuen = 100 - dengen;
	const header = document.createElement("h4");
	header.innerText = "あなたが押したのは……";
	resultDivided.appendChild(header);
	const result = document.createElement("p");
	if (dengen === 100) {
		var resultString = "100％電源ボタンでした！おめでとう！！";
		result.innerText = resultString;
	}
	else if (dengen === 0) {
		var resultString = "100％果樹園の地図記号でした！あなたは電源ボタンを知っていますか？";
		result.innerText = resultString;
	}
	else {
		var resultString = `${dengen}％の電源ボタンと${kajuen}％の果樹園の地図記号でした！`;
		if (dengen >= 90) resultString += "惜しい！";
		else resultString += "残念！";
		result.innerText = resultString;
	}
	
	resultDivided.appendChild(result);

	restartButton.style.visibility = "visible";

	removeAllChildren(tweetDivided);
	const anchor = document.createElement("a");
	const hrefValue = "https://twitter.com/intent/tweet?button_hashtag="
		+ encodeURIComponent("電源ボタンを押せ")
		+ "&ref_src=twsrc%5Etfw";

	anchor.setAttribute("href", hrefValue);
	anchor.className = "twitter-hashtag-button";
	resultString = `あなたが押したのは${resultString}\nhttps://anagohirame.github.io/dengen-button/index.html\n`;
	anchor.setAttribute("data-text", resultString);
	anchor.innerText = 'Tweet #電源ボタンを押せ';
	tweetDivided.appendChild(anchor);

	const script = document.createElement("script");
	script.setAttribute("src", "https://platform.twitter.com/widgets.js");
	tweetDivided.appendChild(script);
}

restartButton.onclick = () => {
	interval = setInterval(move, 10);
	removeAllChildren(resultDivided);
	removeAllChildren(tweetDivided);
	restartButton.style.visibility = "hidden";
}
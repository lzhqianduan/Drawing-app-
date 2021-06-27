var canvas = document.getElementById('canvas');
//注册画笔
var ctx = canvas.getContext('2d');
var drawShapeObj = {
    shape: pickShape.value,
    color: pickColor.value,
    strokeFill: pickStroke.value,
    line: pinkLine.value,
    clearWidth: pinkClear.value
};
document.getElementById('allStyleBox').addEventListener('change', function (ev) {
    var target = ev.target;
    var tag = target.getAttribute('tag');
    drawShapeObj[tag] = target.value;
})
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight - 80;

function DragImg() {
    this.moving = false;  //初始鼠标状态
    this.dis = {};//初始坐标
    this.imgData = '';
    canvas.onmousedown = (ev) => {
        this.moving = true;
        this.dis = {
            x: ev.offsetX,
            y: ev.offsetY
        }
    }
    canvas.onmousemove = (ev) => {
        if (!this.moving) {
            return;
        }
        this[drawShapeObj.shape](ev);
    }
    canvas.onmouseup = () => {
        this.moving = false;
        this.imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    }
}
DragImg.prototype.coment = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.imgData && ctx.putImageData(this.imgData, 0, 0);
    ctx.lineWidth = drawShapeObj.line;
    ctx.strokeStyle = drawShapeObj.color;
    ctx.fillStyle = drawShapeObj.color;
}
//画直线的功能
DragImg.prototype.line = function (ev) {
    this.coment();
    ctx.beginPath();
    ctx.moveTo(this.dis.x, this.dis.y);
    ctx.lineTo(ev.offsetX, ev.offsetY);
    ctx.stroke();
}
//画矩形的功能
DragImg.prototype.rect = function (ev) {
    this.coment();
    ctx.beginPath();
    var { x, y } = this.dis;
    ctx.rect(x, y, (ev.offsetX - x), (ev.offsetY - y));
    ctx[drawShapeObj.strokeFill]();
}
//画圆的功能
DragImg.prototype.circle = function (ev) {
    this.coment();
    ctx.beginPath();
    var { x, y } = this.dis;
    var rai = ev.offsetX - x;
    ctx.arc(x, y, rai, 0, (2 * Math.PI), true);
    ctx[drawShapeObj.strokeFill]();
}
//橡皮擦的功能
DragImg.prototype.clear = function (ev) {
    ctx.clearRect(ev.offsetX, ev.offsetY, drawShapeObj.clearWidth, drawShapeObj.clearWidth);
}
//清除区域的功能
DragImg.prototype.cleararea = function (ev) {
    var { x, y } = this.dis;
    ctx.clearRect(x, y, (ev.offsetX - x), (ev.offsetY - y));
}

var p = new DragImg();
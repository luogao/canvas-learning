import './index.css'

import Pie from './pie'

// function Pie(id) {
//   var canvas = document.getElementById(id);
//   var w = canvas.width;
//   var h = canvas.height;
//   canvas.style.width = w + 'px';
//   canvas.style.height = h + 'px';

//   this.canvas = canvas;
//   this.context = this.canvas.getContext('2d');
//   this.childs = [];
// }

// Pie.prototype.init = function (option) {
//   this.center = option.center || [this.canvas.width / 2, this.canvas.height / 2];
//   this.radius = option.radius || Math.min(this.canvas.width, this.canvas.height) / 2;
//   this.data = option.data;

//   var sum = 0;

//   this.data.forEach(function (item) {
//     sum += item.value;
//   })

//   this.data.forEach(function (item, index) {
//     item.sum = sum;
//     item.percent = item.value / sum;
//     item.center = this.center;
//     item.radius = this.radius;

//     item.start = index > 0 ? this.childs[index - 1].end : 0;
//     item.end = item.start + 2 * item.percent;

//     var pieChild = new PieItem(item);
//     pieChild.draw(this.context);
//     this.childs.push(pieChild);
//   }, this);

//   option.tooltip && this.showTips(option.tooltip);
// }

// Pie.prototype.showTips = function (opt) {
//   var tipEl = document.createElement('div');
//   tipEl.style.background = 'rgba(0,0,0,.7)';
//   tipEl.style.color = '#fff';
//   tipEl.style.borderRadius = '2px';
//   tipEl.style.padding = '2px 5px';
//   tipEl.style.position = 'absolute';
//   tipEl.style.zIndex = '999';
//   tipEl.style.display = 'none';
//   document.body.appendChild(tipEl);

//   var _this = this;
//   this.canvas.addEventListener('mousemove', function (e) {
//     var count = 0;
//     _this.childs.forEach(function (item, index) {

//       if (item.inPath(_this.context, e.offsetX, e.offsetY)) {
//         tipEl.innerHTML = opt.format({
//           value: item.value,
//           name: item.name,
//           percent: item.percent
//         });

//         tipEl.style.left = e.pageX + opt.offset[0] + 'px';
//         tipEl.style.top = e.pageY + opt.offset[1] + 'px';
//         tipEl.style.display = 'block';
//       } else {
//         count++;
//       }
//     });
//     count === _this.childs.length && (tipEl.style.display = 'none');
//   });

//   this.canvas.addEventListener('mouseleave', function () {
//     tipEl.style.display = 'none'
//   })
// }

// function PieItem(option) {
//   for (var k in option) {
//     this[k] = option[k];
//   }
// }

// PieItem.prototype.draw = function (ctx) {
//   ctx.beginPath();
//   ctx.moveTo(this.center[0], this.center[1]);
//   ctx.arc(this.center[0], this.center[1], this.radius, Math.PI * this.start, Math.PI * this.end);
//   ctx.fillStyle = this.color;
//   ctx.fill();
// }

// PieItem.prototype.inPath = function (ctx, x, y) {
//   ctx.beginPath();
//   ctx.moveTo(this.center[0], this.center[1]);
//   ctx.arc(this.center[0], this.center[1], this.radius, Math.PI * this.start, Math.PI * this.end);
//   var ret = ctx.isPointInPath(x, y);
//   ctx.closePath();
//   return ret;
// }

new Pie('canvas').init({
  center: [200, 200],
  radius: 200,
  tooltip: {
    offset: [20, 20],
    format: function (item) {
      return item.name + ':' + item.percent * 100 + '%';
    }
  },
  data: [
    { value: 24, name: 'a', color: '#2196f3' },
    { value: 46, name: 'b', color: '#f44336' },
    { value: 30, name: 'c', color: '#8bc34a' }
  ]
})
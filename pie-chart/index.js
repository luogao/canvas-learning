import './index.css'

import Pie from './pie'

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
    { value: 30, name: 'c', color: 'pink' },
    { value: 60, name: 'd', color: 'yellow' },
    { value: 80, name: 'e', color: 'green' },
    { value: 100, name: 'f', color: 'black' },
  ]
})
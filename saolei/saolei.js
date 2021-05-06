let s = ' [[9,1,0,0,0,1,1,1,0],[1,1,0,0,1,2,9,1,0],[1,1,1,0,1,9,2,1,0],[1,9,2,1,1,1,1,0,0],[1,2,9,1,0,0,1,1,1],[1,2,1,1,0,1,2,9,1],[9,1,0,0,1,2,9,2,1],[1,2,1,1,1,9,2,1,0],[0,1,9,1,1,1,1,0,0]]'

let square = JSON.parse(s)

// 1. templateCell 函数, 参数为数组 line 和变量 x
// line 是每一行的数组
// 比如第一行就是 | 9 | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 0 |
// x 表示第几行
// 这个函数返回 line.length 个 cell 拼接的字符串

const templateCell = (line, x) => {
    let s = '<div class="row clearfix">'
    for (let i = 0; i < line.length; i++) {
        let e = line[i];
        s += `<div class="cell" data-number="${e}" data-x="${x}" data-y="${i}">${e}</div>`
        
    }
    s += '</div>'   
    return s

}

// 2. templateRow 的参数 square 是二维数组
// 用来表示雷相关的数据, 我们这里是直接写死的数据
// 返回 square.length 个 row 拼接的字符串
// row 的内容由 templateCell 函数生成
const templateRow = (square) => {
    let res = ''

    for (let i = 0; i < square.length; i++) {
        let row = square[i];
        res += templateCell(row, i)       
    }

    return res

}

// 3. square 是二维数组, 用来表示雷相关的数据
// 用 square 生成 9 * 9 的格子, 然后插入到页面中
// div container 是 <div id="id-div-mime"></div>
const renderSquare = (square) => {
    let s = templateRow(square)
    let mine = e('#id-div-mime')

    mine.insertAdjacentHTML('beforeend', s)
}


// 4. 实现 bindEventDelegate 函数
// 用事件委托的形式在父元素上面绑定 click 事件, 只处理格子
// 也就是 .cell(即 class 包含 cell 字符串) 元素
// 如果点击的是 .cell 元素, 那么调用 vjkl 函数
// vjkl 是 双拼 「展开」的拼音
// 注意, 我们在 bindEventDelegate 里面不处理具体的逻辑, 只调用函数
// 具体逻辑放在 vjkl 函数里面实现
const bindEventDelegate = (square) => {
    let mine = e('#id-div-mime')
    bindEvent(mine, 'click', (event) => {
        // log("click cell")
        let self = event.target
        vjkl(self, square)
    })

}

const vjkl = (cell, square) => {
    // log("vjkl")
    let num = cell.dataset.number
    // log("number", num)
    if (!cell.classList.contains("show")) {
        cell.classList.add("show")

        if (num === "9") {
            alert("游戏结束！")
        } else if (num === "0") {
            let x = Number(cell.dataset.x)
            let y = Number(cell.dataset.y)
            vjklAround(square, x, y)
        }
    }
}

const vjklAround = (square, x, y) => {

    vjkl1(square, x - 1, y - 1)
    vjkl1(square, x, y - 1)
    vjkl1(square, x + 1, y - 1)
    vjkl1(square, x - 1, y)
    vjkl1(square, x + 1, y)
    vjkl1(square, x - 1, y + 1)
    vjkl1(square, x, y + 1)
    vjkl1(square, x + 1, y + 1)
}
// 7. vjkl1 是重点函数
// 如果满足边界调节, 则继续
    // 满足边界的意思是下标符合范围
// 因为 vjkl1 这个函数的作用是展开格子, 所以如果已经展开过, 那么就不展开元素
// 根据 x 和 y 还有属性选择器选择出格子, 具体可以参考
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors
// 比如想选中 data-x=3 的元素, 语法是 e('[data-x=3]')
// 比如想同时选中 data-x=3 且 data-y=5 的元素, 语法是 e('[data-x=3][data-y=5]')
// 选择元素之后根据情况来判断
// 如果没有展开过, 继续判断下列情况
    // 如果碰到的是 9, 什么都不做.
        // 注意, 这里 9 的处理方式和直接点击格子 9 的处理方式不一样
        // 点击格子 9 也就是点击到雷, 直接结束游戏
        // 这里展开到 9 是指展开到边界情况
    // 如果碰到的是 0, 展开, 并且递归调用 vjklAround 函数
    // 如果碰到的是其他元素, 展开

const vjkl1 = (square, x, y) => {
    // log("vjk11 x y", x, y)
    // 判断是否越界
    if (x >= 0 && x < square.length && y >=0 && y < square[0].length){
        let num = square[x][y]
        let cell = e(`[data-x="${x}"][data-y="${y}"]`)
        let showed = cell.classList.contains("show")

        if (!showed) {
            if (num === 0) {
                cell.classList.add("show")
                vjklAround(square, x, y)
            } else if (num !== 9) {
                cell.classList.add("show")
            }
        }
    }
}

const __main = () => {
    renderSquare(square)
    bindEventDelegate(square)

}
__main()
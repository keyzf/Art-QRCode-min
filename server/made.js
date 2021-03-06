
let express = require('express'),
    app = new express(),
    fs = require('fs'),
    gm = require('gm'),
    UUID = require('uuid');
// 转二进制
let binaryCode = require('./toBinary').getBinary('www.baidu.com', 'M')
// console.log(binaryCode)

// 生成二维码
let computedImg = async function () {
    let a = gm('./assets/avator.jpg')
        .font('./font/font.otf')    //设置字体
        .fontSize(20)
        .drawText(50, 150, 'get my love') //设置水印
        .rotate('purple', 5) //旋转
        .borderColor('pink')
        .border(10, 10) //边框
        .fill('#ffffff')
        .drawRectangle(0, 0, 250, 250)
        // .draw('image over 10,10,70,70,"./assets/material/col2.png"')
    for (let i = 0; i < binaryCode.length; i++) {
        // console.log(binaryCode[i])
        for (let j = 0; j < binaryCode[i].length; j++) {
            drawMaterial(a, binaryCode[i][j], i, j)
            if(binaryCode[i][j]){
            //    a.draw(`image over ${i * 10},${j * 10},10,10 "./assets/material/eye.png"`) 
            }
            
        }
    }
    // await a.draw('image over 10,10,70,70,"./assets/material/col2.png"')

    a.write(`./assets/output/avator${UUID.v1()}.jpg`, function (e) { //设置修改好的路径，UUID.v1()基于时间戳生成唯一标示符
        if (e) {
            console.log(e.message)
        } else {
            console.log('new Image done')
        }
    });
}
/**
 * draw the position material
 *
 * @private
 * @param {Object} ctx
 * @param {Number} index
 * @param {Number} row
 * @param {Number} col
 * @return {Number} type
 */
function drawMaterial(ctx, index, row, col) {
    switch (index) {
        case 1: return ctx.draw(`image over ${row * 10},${col * 10},70,70 "./assets/material/eye.png"`); break;//eye
        case 2: return ctx.draw(`image over ${row * 10},${col * 10},20,30 "./assets/material/row2col3.png"`); break;//row2col3
        case 3: return ctx.draw(`image over ${row * 10},${col * 10},30,20 "./assets/material/row3col2.png"`); break;//row3col2
        case 4: return ctx.draw(`image over ${row * 10},${col * 10},10,40 "./assets/material/row4.png"`); break;//row4
        case 5: return ctx.draw(`image over ${row * 10},${col * 10},20,20 "./assets/material/row2col2.png"`); break;//row2col2
        case 6: return ctx.draw(`image over ${row * 10},${col * 10},20,20 "./assets/material/corner.png"`); break;//corner
        case 7: return ctx.draw(`image over ${row * 10},${col * 10},20,10 "./assets/material/row2.png"`); break;//row2
        case 8: return ctx.draw(`image over ${row * 10},${col * 10},10,20 "./assets/material/col2.png"`); break;//col2
        case 9: return ctx.draw(`image over ${row * 10},${col * 10},10,10 "./assets/material/single.png"`); break;//single
    }
}

computedImg()

app.get('/', function (req, res) {
    let a = binaryCode
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length; j++) {
            if (a[i][j] === true) {
                a[i][j] = 'z'
            }
        }
    }
    res.send(a);
});

app.listen(4000, function () {
    console.log('app is running at 4000')
});



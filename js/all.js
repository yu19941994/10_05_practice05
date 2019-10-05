var list = document.querySelector('.list');
var btn = document.querySelector('.result');
var resultviewer = document.querySelector('.resultview');
var data = JSON.parse(localStorage.getItem('listData')) || [];

function addData(e){
    e.preventDefault();
    var weightvalue= document.querySelector('#weight').value;
    var heightvalue = document.querySelector('#height').value;
    
    var w = parseFloat(weightvalue);
    var h = parseFloat(heightvalue);
    var BMI = w/[(h/100)*(h/100)];
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth()+1;
    var dd = d.getDate();
    /*只取到小數後兩位*/
    BMI = BMI.toFixed(2);
    var degree='';
    var color='';
    /*判斷輕重*/
    if(BMI >= 35){
        degree = '重度肥胖';
        color = '#ff1200';
    }else if(BMI >= 30){
        degree = '中度肥胖';
        color = '#ff6c03';
    }else if (BMI >= 27){
        degree = '輕度肥胖';
        color = '#ff6c03';
    }else if (BMI >= 24){
        degree = '過重';
        color = '#ff982d';
    }else if (BMI >= 18.5){
        degree = '理想';
        color = '#86d73f';
    }else{
        degree = '過輕';
        color = '#31baf9'
    }


    var todo ={
        BMI: BMI,
        weight: w,
        height: h,
        degree: degree,
        color: color,
        year: y,
        month: m,
        date: dd
    };
    data.push(todo);
    updateList(data);
    // console.log(BMI);
    localStorage.setItem('listData', JSON.stringify(data));
}

function updateList(items){
    str='';
    view='';
    var len = items.length;
    for(var i=0; i<len; i++){
        str += '<li class="listli" style="border-left: 3px solid ' + items[i].color + ';"><span class="degreestyle">' + items[i].degree + '</span><span class="contentstyle"><em style="font-size: 0.2em; margin-right: 8px;">BMI</em>' + items[i].BMI + '</span><span class="contentstyle"><em style="font-size: 0.2em; margin-right: 8px;">weight</em>' + items[i].weight + 'kg</span><span class="contentstyle"><em style="font-size: 0.2em; margin-right: 8px;">height</em>' + items[i].height + 'cm</span><span class="contentstyle-d"><em style="font-size: 0.2em;">' + items[i].date + '-</em><em style="font-size: 0.2em;">' + items[i].month + '-</em><em style="font-size: 0.2em;">' + items[i].year +'</em></span><a class="delete" href="#" data-num =' + i +'>刪除</a><div class="clearfix"></div></li>';
        view = '<input value="' + items[i].BMI + '" class="resultviewer" style="color:' + items[i].color + '; border: 4px solid' + items[i].color + '"><span class="viewdegree" style="color:' + items[i].color + ';">' + items[i].degree + '</span><div class="clearfix"></div><input class="loop" style=" background-color: ' + items[i].color + ';"><span class="BMIview" style="color:' + items[i].color+';">BMI</span>'
    }
    list.innerHTML = str;
    resultviewer.innerHTML = view;
}

function toogleDone(e){
    e.preventDefault();
    if(e.target.nodeName !== 'A'){return}
    var n = e.target.dataset.num;
    data.splice(n,1);
    localStorage.setItem('listData',JSON.stringify(data));
    updateList(data);
}
btn.addEventListener('click', addData,false);
list.addEventListener('click', toogleDone,false);
updateList(data);
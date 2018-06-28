var conList = document.getElementById('conList');
function addElement(){
    ajax({
        url: '/getAllList',
        type: 'GET',
        dataType: 'JSON',
        cache: false,
        success: function (result) {
         if (result && result.code == 0) {
          bindHTML(result.data);
          bindEvent();
         }
        }
       });   
}
function bindHTML(data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
     var cur = data[i];
     str += '<li>';
     str += '<span class="fir">' + cur.id + '</span>';
     str += '<span>' + cur.name + '</span>';
     str += '<span class="fir">' + cur.age + '</span>';
     str += '<span>' + cur.phone + '</span>';
     str += '<span>' + cur.address + '</span>';
     str += '<span class="control">';
     str += '<a href="add.html?id=' + cur.id + '" rel="external nofollow" >修改</a>';
     str += '<a href="javascript:;" rel="external nofollow" data-id="' + cur.id + '">删除</a>';
     str += '</span>';
     str += '</li>';
    }
    conList.innerHTML = str;
   }
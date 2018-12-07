/**
 * Created by 54721 on 2018/12/2.
 */
$(function() {


  // 1. 获取地址栏中的搜索关键字
  var key = getSearch("key");

  // 2. 给搜索框赋值
  $('.search_input').val( key );

  // 3. 发送ajax, 获取商品列表数据, 进行页面渲染
  render();

  // 4. 给搜索按钮注册点击事件
  $('.search_btn').click(function() {
    render();
  });


  // 5. 实现排序按钮的切换效果
  // (1) 如果当前按钮, 没有 current类, 给当前按钮, 加上current类, 注意排他
  // (2) 如果当前按钮, 有 current类, 切换箭头的方向 (fa-angle-up, fa-angle-down)
  $('.lt_sort a[data-type]').click(function() {
    if ( $(this).hasClass("current") ) {
      // 有current类, 切换箭头方向 (i)
      $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    }
    else {
      // 没有current类
      $(this).addClass("current").siblings().removeClass("current");
    }

    // 重新渲染
    render();
  })



  function render() {

    // 重新渲染页面前, 应该显示成加载中效果
    $('.lt_product').html('<div class="loading"></div>');

    var obj = {};
    // 处理 3 个必传的参数
    obj.proName = $('.search_input').val();   // 搜索关键字
    obj.page = 1;
    obj.pageSize = 100;

    // 两个用于排序的可传参数
    // 通过 有没有 高亮的 a 决定是否需要排序
    var $current = $('.lt_sort a.current');

    if ( $current.length === 1 ) {
      // 有高亮的a, 需要排序, 需要额外传参
      console.log("需要排序");
      var sortName = $current.data("type"); // price  排序的键

      // 排序的值, 通过箭头方向决定 1升序 2降序
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

      // 将需要传递的参数, 作为属性, 添加到obj中
      obj[ sortName ] = sortValue;
    }

    setTimeout(function() {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: obj,
        dataType: "json",
        success: function( info ) {
          console.log( info );
          var htmlStr = template("productTpl", info);
          $('.lt_product').html( htmlStr );
        }
      })
    }, 1000);
  }




})
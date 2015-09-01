(function(){
    
    /*----------------------------------------------------------------------
	 *header中banner部分
	 *----------------------------------------------------------------------
	 */
    var ul = util.$('uul'),
        uli = ul.getElementsByTagName('li'),
        ol = util.$('ool'),
        oli = ol.getElementsByTagName('li');
    
    //动态获取banner高度(实现自适应)
    window.onresize = function(){
        var banner_h = uli[0].offsetHeight,
            banner = util.$('banner');
        console.log('高度'+banner_h);
        banner.style.height = banner_h+'px';
        console.log(banner);
        console.log('大div'+banner.style.height);
    }
    
    for(var i=0; i<oli.length; i++){
            util.addEvent(oli[i],'mouseover',showNum);
    }
    
    //鼠标滑过banner中小圆点进行banner图的切换
    function showNum(){
        for(var j=0; j<oli.length; j++){
            oli[j].index=j;
            oli[j].className='';
            uli[j].style.opacity=0;
            uli[j].style.filter='alpha(opacity=0)';
        }
        this.className='shownum';
        uli[this.index].style.opacity=1;
        uli[this.index].style.filter='alpha(opacity=100)';
    }
    
    //自动轮播
    var timer=setInterval(autoChange,5000);
    function autoChange(){
        for(var n=0; n<oli.length;n++){
            if(oli[n].className=='shownum'){
                for(var k=0; k<oli.length; k++){
                    oli[k].className='';
                    uli[k].style.opacity=0;
                }
                if(n==2){
                    n=0;
                }else{
                    n++;
                }
                oli[n].className='shownum';
                uli[n].style.opacity=1;
            }
        }
    }
    
    
    /*----------------------------------------------------------------------
	 *content中课程列表部分，包括AJAX跨域请求，标签卡切换操作，转页部分
	 *----------------------------------------------------------------------
	 */
    var class_list = util.$('class_list');
    var class_html = '';
    var current_page=1;
    var current_type=10;
    
    //标签卡切换操作
    var tab1 = util.$('tab1'),
        tab2 = util.$('tab2');
    tab1.onclick = clickTab;
    tab2.onclick = clickTab;
    function clickTab(event){
        var event = event||window.event,
            target = util.getTarget(event),
            target_parent = target.parentNode,
            clsname = target_parent.className;
        util.preventEvent(event);
        if(target==tab2){
            target_parent.style.background = '#39a030';
            target.style.color = '#fff';
            tab1.parentNode.style.background = '#fff';
            tab1.style.color = '#333';
            current_type = 20;
        }else{
            target_parent.style.background = '#39a030';
            target.style.color = '#fff';
            tab2.parentNode.style.background = '#fff';
            tab2.style.color = '#333';
            current_type = 10;
        }
        for(var o = 1; o<page_lis.length-1; o++){
            page_lis[o].style.background = '#f8f8f8';
            page_lis[o].firstChild.style.color = '#333';
        }
        
        /*以下3行是为消除在一标签卡选中其他页码x后，在选择另一标签卡时自动也选中x页码的bug*/
        current_page = 1;
        page_lis[current_page].style.background = '#9dd8b1';
        page_lis[current_page].firstChild.style.color = '#fff';
        
        var request = util.createXHR('GET','http://study.163.com/webDev/couresByCategory.htm'+'?pageNo='+current_page+'&psize=20'+'&type='+current_type);
        if(request){
            request.onload = requestLoad;
            request.send(null);
        }
        
    }
    
    //转页部分
    var page_list = util.$('page_list'),
        page_lis = page_list.getElementsByTagName('li'),
        lis_con;
    for(var page_num = 1; page_num<page_lis.length-1; page_num++){
        page_lis[page_num].firstChild.onclick = clickPage;
    }
    page_lis[0].onclick = clickPre;
    page_lis[9].onclick = clickNext;
    
    //数字页码部分
    function clickPage(event){
        var event = event || window.event,
            target = util.getTarget(event);
        util.preventEvent(event);
        if(navigator.appName.indexOf('Explorer') > -1){
            lis_con = target.innerText;
        }else{
            lis_con = target.textContent;
        }
        for(var o = 1; o<page_lis.length-1; o++){
            page_lis[o].firstChild.className = '';
        }
        target.className = 'current-page';
    
        current_page = lis_con;
        var request = util.createXHR('GET','http://study.163.com/webDev/couresByCategory.htm'+'?pageNo='+current_page+'&psize=20'+'&type='+current_type);
        if(request){
            request.onload = requestLoad;
            request.send(null);
        }
    }
    
    
    //"前一页"部分
    function clickPre(event){
        var event = event || window.event;
        util.preventEvent(event);
        if(current_page != 1){
            for(var o = 1; o<page_lis.length-1; o++){
                page_lis[o].style.background = '#f8f8f8';
                page_lis[o].firstChild.style.color = '#333';
            }
            current_page--;
            page_lis[current_page].style.background = '#9dd8b1';
            page_lis[current_page].firstChild.style.color = '#fff';
            var request = util.createXHR('GET','http://study.163.com/webDev/couresByCategory.htm'+'?pageNo='+current_page+'&psize=20'+'&type='+current_type);
            if(request){
                request.onload = requestLoad;
                request.send(null);
            }
        }
    }
    
    //"下一页"部分
    function clickNext(event){
        var event = event || window.event,
            target = util.getTarget(event);
        util.preventEvent(event);
        if(current_page != 8){
            for(var o = 1; o<page_lis.length-1; o++){
                page_lis[o].style.background = '#f8f8f8';
                page_lis[o].firstChild.style.color = '#333';
            }
            current_page++;
            page_lis[current_page].style.background = '#9dd8b1';
            page_lis[current_page].firstChild.style.color = '#fff';
            var request = util.createXHR('GET','http://study.163.com/webDev/couresByCategory.htm'+'?pageNo='+current_page+'&psize=20'+'&type='+current_type);
            if(request){
                request.onload = requestLoad;
                request.send(null);
            }
        }
        
    }
    
    //AJAX跨域请求
    
    //设置其在首页即可显示
    var request = util.createXHR('GET','http://study.163.com/webDev/couresByCategory.htm'+'?pageNo='+current_page+'&psize=20'+'&type='+current_type);
    if(request){
            request.onload = requestLoad;
            request.send(null);
    }
    
    //请求课程列表响应后操作函数
    function requestLoad(){
                var result = JSON.parse(this.responseText),
                    list = result.list;//获取返回数据中的课程列表
        
                class_html='';
                
                for(var num=0;num<list.length;num++){
                    class_html+=
                        '<li class="f-left">'+
                        '<div class="m-classm f-left">'+
                            '<img src="'+list[num].middlePhotoUrl+'" alt="课程图片"/>'+
                            '<div class="classm-intro font12">'+list[num].name+'</div>'+
                            '<div class="classm-author font12">'+list[num].provider+'</div>'+
                            '<div class="classm-fans font11">'+list[num].learnerCount+'</div>'+
                            '<div class="classm-cost">'+list[num].price+'</div>'+
                            '<div class="m-classhover f-left">'+
                                '<img src="'+list[num].middlePhotoUrl+'" class="hover-img f-left" alt="课程图片"/>'+
                                '<div class="hover-tit f-left">'+list[num].name+'</div>'+
                                '<div class="hover-fans f-left">'+list[num].learnerCount+'人在学'+'</div>'+
                                '<div class="hover-author f-left">'+'发布者：'+list[num].provider+'</div>'+
                                '<div class="hover-class f-left">'+'分类：'+list[num].categoryName+'</div>'+
                                '<div class="hover-des font14 f-left">'+list[num].description+'</div>'+
                            '</div>'+
                        '</div>'+
                        '</li>';
                }
                class_list.innerHTML=class_html;
    }
    
    //查看课程详情弹窗
    
    
    
    
    
    /*----------------------------------------------------------------------
	 *content中最热排行部分
	 *----------------------------------------------------------------------
	 */
    var rank_html = '',
        rank_ul = util.$('rank_ul');
    
    //AJAX跨域请求
    var xhr = util.createXHR('GET','http://study.163.com/webDev/hotcouresByCategory.htm');
    if(xhr){
        xhr.onload = xhrLoad;
        xhr.send(null);
    }
    
    /*function newXHR(method,url){
        var xhr = new XMLHttpRequest();
        if('withCredentials' in xhr){
            xhr.open(method,url,true);
        }else if(typeof XDomainRequest != 'undefined'){
            xhr = new XDomainRequest();
            xhr.open(method,url);
        }else{
            xhr = null;
        }
        return xhr;
    }*/
    
    //请求最热排行列表响应后操作函数
    function xhrLoad(){
        var rank_result = JSON.parse(this.responseText);
        for(var rank_num=0; rank_num<rank_result.length; rank_num++){
            rank_html+='<li class="f-left">'+
                        '<div class="f-left">'+
                            '<img src="'+rank_result[rank_num].smallPhotoUrl+'" alt="最热排名" class="rank-img"/>'+
                        '</div>'+
                        '<div class="f-left">'+
                            '<div class="rank-contit">'+rank_result[rank_num].name+'</div>'+
                            '<div class="rank-fans">'+
                                '<img src="images/rank-fans.png" alt="rank-fans" class="f-left"/>'+
                                '<div class="fans-num f-left">'+rank_result[rank_num].learnerCount+'</div>'+
                            '</div>'+
                        '</div>'+
                        '</li>';
        }
        rank_ul.innerHTML = rank_html;
        
        //获取排行列表每一项的top值
        var rank_li = rank_ul.getElementsByTagName('li');
        var tops =[];
        for(var p=0; p<rank_li.length; p++){
            rank_li[p].style.position='absolute';
            rank_li[p].style.top = p*74+'px';
            tops[p]=rank_li[p].style.top.substr(0,rank_li[p].style.top.indexOf('px'));
            
        }
        
        //根据top值和定时器的设置实现自动滚动
        setInterval(rankMove,5000);
        function rankMove(){
            for(var p=0; p<rank_li.length; p++){
                tops[p] -= 74;
                rank_li[p].style.top = tops[p]+'px';
            }
            for(var p=0; p<rank_li.length; p++){
                if(tops[p]<0){
                    tops[p] = tops[19]+74*(p+1);
                    rank_li[p].style.top = tops[p]+'px';
                }
            }
        }
                        
    }
    
    
    /*----------------------------------------------------------------------
	 *header中关闭顶部通知条操作(cookie记录)
	 *----------------------------------------------------------------------
	 */
    var remind = util.$('remind'),
        topbar = util.$('topbar');
    util.addEvent(remind,'click',clickRemind);
    function clickRemind(event){
        var event = event||window.event;
        util.preventEvent(event);
        util.setCookie('topcookie','none',14);
        topbar.style.display = 'none';
    }
    //页面对于顶部通知条的display设置取决于cookie
    topbar.style.display = util.getCookie('topcookie','block');
    
    
    /*----------------------------------------------------------------------
	 *header中关注“网易教育产品部”/登录操作部分(cookie)
	 *----------------------------------------------------------------------
	 */
    var att = util.$('att'),
        att = util.$('att'),
        att_yes = util.$('att_yes')
    util.addEvent(att,'click',clickAtt);
    
    //点击关注按钮
    function clickAtt(event){
        var event = util.getEvent(event);
        util.preventEvent(event);
        console.log(util.getCookie('loginSuc','no'));
        
        //检测到未登录
        if(util.getCookie('loginSuc','no')=='no'){
            //弹出登录框
            var login_bg = util.$('login_bg'),
                login = util.$('login');
            login_bg.style.display = 'block';
            login.style.display = 'block';
            
            //点击登录，表单验证
            var login_btn = util.$('login_btn'),
                user= util.$('user'),
                pw = util.$('pw');
            util.addEvent(login_btn,'click',clickLogin);
            
            function clickLogin(event){
                var event = util.getEvent(event);
                util.preventEvent(event);
                if(user.value){
                    if(pw.value){
                        //Md5加密
                        var username = hex_md5(user.value),
                            password = hex_md5(pw.value);
                        //AJAX跨域请求
                        var login_xhr = util.createXHR('GET','http://study.163.com/webDev/login.htm'+'?userName='+username+'&password='+password);
                        if(login_xhr){
                            login_xhr.onload = function(){
                                if(this.responseText==1){
                                    alert('登录成功');
                                    clickClose();//关闭登录窗口
                                    util.setCookie('loginSuc','yes',14);//设置登录cookie
                                    //调用关注API
                                    var att_xhr = util.createXHR('GET','http://study.163.com/webDev/attention.htm');
                                    if(att_xhr){
                                        att_xhr.onload = function(){
                                            if(this.responseText==1){
                                                util.setCookie('followSuc','yes',14);
                                                //“关注”按钮变成不可点的“已关注”状态
                                                att.style.display = 'none';
                                                att_yes.style.display = 'block';
                                            }
                                        };
                                        att_xhr.send(null);
                                    }
                                }else{
                                    alert('请输入正确的用户名和密码')
                                }
                            };
                            login_xhr.send(null);
                        }
                    }else{
                        alert('请输入密码');
                    }
                }else{
                    alert('请输入用户名');
                }
                
            }
        
            //点击登录框的关闭按钮
            var login_close = util.$('login_close');
            util.addEvent(login_close,'click',clickClose);
            
            function clickClose(event){
                var event = util.getEvent(event);
                util.preventEvent(event);
                login_bg.style.display = 'none';
                login.style.display = 'none';
            }
        }else//检测到已登录，但之前取消关注
        {
            //调用关注API
            var att_xhr = util.createXHR('GET','http://study.163.com/webDev/attention.htm');
            if(att_xhr){
                att_xhr.onload = function(){
                    if(this.responseText==1){
                    util.setCookie('followSuc','yes',14);
                    //“关注”按钮变成不可点的“已关注”状态
                    att.style.display = 'none';
                    att_yes.style.display = 'block';
                    }
                };
                att_xhr.send(null);
            }  
        }

    }
    
    
    /*----------------------------------------------------------------------
	 *header中取消关注的操作部分(cookie)
	 *----------------------------------------------------------------------
	 */
    var cancel = util.$('cancel');
    util.addEvent(cancel,'click',clickCancel);
    function clickCancel(event){
        var event = util.getEvent(event);
        util.preventEvent(event);
        util.setCookie('followSuc','no',14);
        att.style.display = 'block';
        att_yes.style.display = 'none';
    }
    
    
    /*----------------------------------------------------------------------
	 *content中视频播放的操作部分
	 *----------------------------------------------------------------------
	 */
    var video = util.$('video'),
        login_bg = util.$('login_bg'),
        video_play = util.$('video_play');
    util.addEvent(video,'click',clickVideo);
    function clickVideo(event){
        login_bg.style.display = 'block';
        video_play.style.display = 'block';
    }
    //视频窗口关闭
    var video_close = util.$('video_close'),
        video_h5 = util.$('video_h5');
    util.addEvent(video_close,'click',clickCloseVideo);
    function clickCloseVideo(event){
        var event = util.getEvent(event);
        util.preventEvent(event);
        video_h5.pause();
        login_bg.style.display = 'none';
        video_play.style.display = 'none';
    }
    
    
    
    
})();
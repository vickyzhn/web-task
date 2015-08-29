var util = (function(){
    
    
    /*----------------------------------------------------
	 *id选择器
	 *@param id {string} 要选择的id名
     *@return document.getElementById(id) {object} 要选择的节点或对象
	 *----------------------------------------------------
	 */
	var $ = function(id){
		return document.getElementById(id);
	};
    
    
    /*----------------------------------------------------
	 *类名选择器
	 *@param classname {string} 要选择的类名
     *@param parent {object} 要进行筛选的父类节点或对象
	 *----------------------------------------------------
	 */
    var byClass = function(classname,parent){
        var oParent = parent?document.getElementById(parent):document,
            ele=[],
            elements = oParent.getElementsByTagName('*');
        for(var i=0;i<elements.length;i++){
            if(elements[i].className==classname){
                ele.push(elements[i]);
            }
        }
        return ele;//返回的是数组
    }
    
    
	/*----------------------------------------------------
	 *事件绑定
	 *@param element {object} 要绑定事件的节点或对象
	 *@param event {string} 事件类型
	 *@param callback {function} 要绑定的函数 
	 *----------------------------------------------------
	 */
	var addEvent = function(element,event,callback){
		if(element.addEventListener){
			element.addEventListener(event,callback,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+event,callback);
		}else{
			element['on'+event] = callback;
		}
	};
    
    
    /*----------------------------------------------------
	 *事件移除
	 *@param element {object} 要绑定事件的节点或对象
	 *@param event {string} 事件类型
	 *@param callback {function} 要绑定的函数 
	 *----------------------------------------------------
	 */
    var removeEvent = function(element,event,callback){
        if(element.removeEventListener){
            element.removeEventListener(event,callback,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+event,callback);
        }else{
            element['on'+event] = null;
        }
    };
    
    
    /*----------------------------------------------------
	 *取消事件默认行为
	 *@param event {object} 事件对象 
	 *----------------------------------------------------
	 */
    var preventEvent = function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    };
    
    
    /*----------------------------------------------------
	 *取消事件冒泡
	 *@param event {object} 事件对象 
	 *----------------------------------------------------
	 */
    var stopEvent = function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    };
    
    
    /*----------------------------------------------------
	 *获取事件对象(兼容)
	 *@param event {object} 事件对象 
     *@return event||window.event {object} 事件对象
	 *----------------------------------------------------
	 */
	var getEvent = function(event){
		return event ? event : window.event;
	};
    
    
    /*----------------------------------------------------
	 *获取触发事件的源对象(兼容)
	 *@param event {object} 事件对象 
     *@return event.target || event.srcElement {object} 触发事件的源对象
	 *----------------------------------------------------
	 */
	var getTarget = function(event){
		return event.target || event.srcElement;
	};
    
    
	/*----------------------------------------------------
	 *保存数据到localStorage
	 *@param key {string} 键值，之后可以通过该键值读取数据
	 *@param dataObj {object} 要保存的数据  
	 *----------------------------------------------------
	 */
	var saveData = function(key,dataObj){
		if(typeof window.localStorage!=="undefined"){
  			localStorage[key] = JSON.stringify(dataObj);
  		}else{
  			return false;
  		}
	};
    
    
	/*----------------------------------------------------------------------
	 *读取localStorage中的数据
	 *@param key {string} 通过该键值读取数据
	 *@return dataObj {object} 返回的是一个对象，该对象封装了对应键值的数据  
	 *----------------------------------------------------------------------
	 */
	var readData = function(key){
		if(typeof window.localStorage!=="undefined"){
  			return JSON.parse(localStorage[key]);
  		}else{
  			return false;
  		}
	};
    
    
    /*----------------------------------------------------------------------
	 *创建CORS跨域下的XHR
	 *@param method {string} 请求数据的方式('GET'或'POST')
	 *@param url {string} 请求地址(绝对地址) 
     *@return xhr {object} 创建的XHR
	 *----------------------------------------------------------------------
	 */
    var createXHR = function(method,url){
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
    };
    
    
    /*----------------------------------------------------------------------
	 *设置cookie
	 *@param name {string} 设置cookie项名称
     *@param value {string} 设置cookie项对应的值
     *@param iDay {number} 设置cookie保存的天数
	 *----------------------------------------------------------------------
	 */
    var setCookie = function(name,value,iDay){
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie=name+'='+value+'; expires='+oDate;
    };
    
    
    /*----------------------------------------------------------------------
	 *读取cookie
	 *@param name {string} 要读取的cookie项的名称
     *@param lose {string/number} 读取不到该项时要返回的字符串或值
     *@return arr[2] {string/number} 要读取的cookie项对应的值
	 *----------------------------------------------------------------------
	 */
    var getCookie = function(name,lose){
        var arr = document.cookie.split('; ');
        for(var p=0; p<arr.length; p++){
            var arr2 = arr[p].split('=');
            if(arr2[0] == name){
                return arr2[1];
            }
        }
        return lose;
    }
    
	return {
		$ : $,
        byClass : byClass,
		addEvent : addEvent,
        removeEvent : removeEvent,
        preventEvent : preventEvent,
        stopEvent : stopEvent,
		saveData : saveData,
		readData : readData,
		getEvent : getEvent,
		getTarget : getTarget,
        createXHR : createXHR,
        setCookie : setCookie,
        getCookie : getCookie
	};
})();
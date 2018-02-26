import io from 'socket.io-client'

var socket = io('http://192.168.10.55:5000',{
	extraHeaders:{
		'Access-Control-Allow-Origin':' http://192.168.10.42'
	}
});

let btn = document.getElementById('btn');
btn.addEventListener('change', function(){
    socket.emit('light', Number(btn.checked)); 
});


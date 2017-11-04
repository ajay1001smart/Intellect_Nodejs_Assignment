var express= require('express');
var moment= require('moment');
var app = express();
var user= require('./User.json');
var todos = require('./Todos.json');

app.get('/todos/:id',function(req,res){
	var todos_array = todos.Todos;
	for(var i=0; i < todos_array.length ; i++){
		if(todos_array[i].id === req.params.id){
			console.log('selected_todos11'+JSON.stringify(todos_array[i]));
			break;
		}
	}
	res.send(JSON.stringify(todos_array[i]));
});

app.get('/user/:userid',function(req,res){
	var user_array=user.User;
	var todos_array = todos.Todos;
	var selected_user;
	var selected_todos=[];
	for(var i=0; i<user_array.length ; i++){
		if(user_array[i].id === req.params.userid){
			selected_user = user_array[i];
			break;
		}
	}
	if(typeof selected_user !== 'undefined'){
		for(var i=0; i < todos_array.length ; i++){
		if(todos_array[i].userid === selected_user.id && todos_array[i].done === false){
			selected_todos.push(todos_array[i]);
			}
		}
	}
	var response={};
	response.user= selected_user;
	response.todos= selected_todos;
	res.send(JSON.stringify(response));
});

app.get('/active_users',function(req,res){
	var user_array=user.User;
	var todos_array = todos.Todos;
	var response={};
	var active_users=[];
	for(var i=0; i<user_array.length ; i++){
		if(user_array[i].isActive){
			active_users.push(user_array[i]);
		}
	}
	response.active_users=active_users;
	for(var i=0;i < active_users.length; i++){
		var user_todos=[];
		for(var j=0; j < todos_array.length ; j++){
			if(active_users[i].id == todos_array[j].userid){
				user_todos.push(todos_array[j]);
			}
		}
		response.active_users[i].user_todos = user_todos;
	}
	res.send(JSON.stringify(response));
});

app.get('/2daytom/:userid',function(req,res){
	var user_array=user.User;
	var todos_array = todos.Todos;
	var selected_user;
	var response={};
	for(var i=0; i<user_array.length ; i++){
		if(user_array[i].id === req.params.userid){
			selected_user = user_array[i];
			break;
		}
	}
	var todos_2dayTom = [];
	if(typeof selected_user !== 'undefined'){
		for(var i=0; i < todos_array.length ; i++){
		if(todos_array[i].userid === selected_user.id && todos_array[i].done === false){
				var target_date = moment(new Date(todos_array[i].targetDate));
				var current_date = moment(new Date());
				if(target_date.diff(current_date) > 0 && target_date.diff(current_date) < 172800000){
					todos_2dayTom.push(todos_array[i]);
				}
			}
		}
	}
	response.userId=selected_user.id;
	response.todos_2dayTom = todos_2dayTom;
	res.send(response);
});


app.listen(3001,function(){
	console.log('server is listening...');
});

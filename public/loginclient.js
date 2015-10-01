 function isNull (value) {
 	if (!value.val()) {
 		return true;
 	}
 	else {
 		return false;
 	}
 }

 // function isWeak(name, value) {

 // 	if(name.val().length < value)
 // 		return (name + " should be atleast " + value + " long");
 // 	else 
 // 		return false;
 // }

 // function isBanned(name) {


 //      var dict = {};
 //      $.get("/reserved.txt",function(txt) {
 //      var words = txt.split( " " );
 //      for ( var i = 0; i < words.length; i++ ) {
 //      dict[ words[i] ] = true;
 //      }
 //      });


 //      if(dict[name]){
	// 	return true;
 //       } 
 //      else {
 //      	return false;
 //      }

 // }

 function setError(error, text, flag){

 	error.text(text);
 	error.show();
 	flag=false;
 }

 // function hideError(error) {
 // 	error.text('');
 // 	error.hide();
 // }


//  $('#password').blur(function() {

//     if($(this).val().length < 4) {
//       $('#perror').text("password must be atleast 4 characters long");
//       $('#perror').show(); 
//     }

//   else {   
//         $('#perror').hide();
//     }
  
// });

 // $('#username').blur(function() {


 //  var name = $('#username').val();

 //  if(dict[name]){
 //     $('#uerror').text('illegal username');
 //     $('#uerror').show();
 //     $('#username').val('');
 //   } 
 //   else {
 //    $('#uerror').text('');
 //    $('#uerror').hide();
 //   }  

 // });

 $('#loginForm').submit(function(e){
    e.preventDefault();
    
    var validated = true; 
    
    if(isNull($('#username'))) {
    	setError($('#uerror'), "please enter username", validated);
    }

    if(isNull($('#password'))) {
    	setError($('#perror'), "please enter password", validated);
    }
   
    if(validated){
      $('#loginForm')[0].submit();
    }
 });



// $('#signUpform').submit(function(e){
//   e.preventDefault();
//   var validated = true;

// //username validations      
//       if(!$('#username').val()){
//       $('#uerror').text('please enter username');
//       $('#uerror').show();
//       $('#username').val('');
//       validated = false;
//       }
      
//       if(!$('#username').val().length < 4){
//       $('#uerror').text('username must be atleast 4 characters');
//       $('#uerror').show();
//       $('#username').val('');
//       validated = false;
//       }

//     //    else {
//     //     $('#uerror').text('');
//     //     $('#uerror').hide();
//     //    }  
//     // //password validations
//     //   if(!$('#password').val()){
//     //     $('#perror').text('please enter a password');
//     //     $('#perror').show();
//     //     $('#password').val('');
//     //      validated = false;
//     //   }

//     //   if(!$('#password').val()){
//     //     $('#perror').text('please enter a password');
//     //     $('#perror').show();
//     //     $('#password').val('');
//     //      validated = false;
//     //   }

//     //   if($('#password').val().length < 3){
//     //     $('#perror').text('password must be atleast 3 characters');
//     //     $('#perror').show();
//     //     $('#password').val('');
//     //      validated = false;
//     //   }

//     //   if(!($('#password').val() == $(repassword).val())){
//     //     $('#rperror').text('please enter a password');
//     //     $('#perror').show();
//     //     $('#password').val('');
//     //      validated = false;
//     //   }
//       if(validated){
//         $('#signUpform')[0].submit();
//       }
// });

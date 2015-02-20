<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login Page</title>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>


<script type="text/javascript">
	function loginUser() {
		var userName = $("#Username").val();
		var password = $("#Password").val();
		var formData = 'username='+userName+'&password='+password;
		$.ajax({
			url : 'validateLogin.php',
			method:"post",
			data: formData,
			success : function(responseData) {
				$("#resultDiv").html("Welcome "+ responseData);
			},
			error: function() { 
				alert("error loading file");  
			}
		});
	}
	
	$(document).ready(function() {
		$("#submit").click(loginUser);			
	});
</script>
</head>
<body>

	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Login</h3>
		</div>
		<div class="panel-body">
			<form>
				<div class="form-group">
					<label for="Username">Username</label> <input type="text"
						class="form-control" id="Username" placeholder="Enter Username" />
				</div>
				<div class="form-group">
					<label for="Password">Password</label> <input type="password"
						class="form-control" id="Password" placeholder="Password" />
				</div>
				<input class="btn btn-default" type="button" id="submit"
					value="login" />
				<input type="reset" class="btn btn-default" value="Reset"/>
			</form>
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Results</h3>
		</div>
		<div class="panel-body">
			<div id="resultDiv">
			
			</div>
		</div>
	</div>
</body>
</html>
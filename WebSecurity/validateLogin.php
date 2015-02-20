<?php
include('dbInit.php');
	
if (empty($_POST['username']) || empty($_POST['password'])) {
	echo "Username or Password is empty";
}
else
{
	$row='';	
	$username=$_POST['username'];
	$password=$_POST['password'];

	$sql="SELECT * FROM userdb.users WHERE username = '".$username."' AND password = '".$password."' ";
	$result = mysqli_query($link,$sql);
	
	if($result){
  		$numrows = mysqli_num_rows($result);
		$output = "";
		if ($numrows >= 1) {
			while($row = mysqli_fetch_array($result)){
				echo $row[0].'</br>';
			}
		} else {
			echo "Username or Password is invalid";
		}
	}
	else
  		die("Query failed:".mysqli_error($link)." Query:".$sql);

mysqli_close($link);
}
	
?>
function back() {
	window.location.href="../index.html";
}


function validatePassword() {
	var pass = document.getElementById("password");
	var cPass = document.getElementById("cPassword");
	if (pass.value != cPass.value) {
		alert("Please enter the same password again!");
	}
	else {
	}
}


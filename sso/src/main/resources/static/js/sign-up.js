$(document).ready(async function() {
	AuthSignUp.redirectUri = $("#redirectUri").val()
	$("#btn-sign-up").unbind();
	$("#btn-sign-up").click(function() {
		AuthSignUp.methods.signUp();
	});

	$("#repeat-password-sign-up").unbind();
	$("#repeat-password-sign-up").keyup(function(e) {
		if (e.keyCode == 13) {
			AuthSignUp.methods.signUp();
		}
	});
})



const AuthSignUp = {
	redirectUri: "",
	methods: {
		signUp: () => {
			const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

			const passwordRegex1 = /(?=.*[A-Za-z])/;
			const passwordRegex2 = /(?=.*\d)/
			const passwordRegex3 = /(?=.{8,})/

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			let fullname = $("#fullname-sign-up").val()
			let email = $("#email-sign-up").val()
			let username = $("#username-sign-up").val()
			let password = $("#password-sign-up").val()
			let passwordRepeat = $("#repeat-password-sign-up").val()

			if (fullname.trim() == "") {
				$("#err-fullname-sign-up").text("Tên đầy đủ không được bỏ trống")
				return
			}
			else {
				$("#err-fullname-sign-up").text("")
			}

			if (email.trim() == "") {
				$("#err-email-sign-up").text("Email không được bỏ trống")
				return
			}
			else if (!emailRegex.test(email)) {
				$("#err-email-sign-up").text("Email không hợp lệ")
				return
			}
			else {
				$("#err-email-sign-up").text("")

			}

			if (username.trim() == "") {
				$("#err-username-sign-up").text("Tên tài khoản không được bỏ trống")
				return
			}
			else {
				$("#err-username-sign-up").text("")
			}

			if (password.trim() == "") {
				$("#err-password-sign-up").text("Mật khẩu không được bỏ trống")
				return
			}

			else if (!passwordRegex1.test(password)) {
				$("#err-password-sign-up").text("Mật khẩu phải có ít nhất 1 chữ cái")
				return
			}

			else if (!passwordRegex2.test(password)) {
				$("#err-password-sign-up").text("Mật khẩu phải có ít nhất 1 chữ số")
				return
			}

			else if (!passwordRegex3.test(password)) {
				$("#err-password-sign-up").text("Mật khẩu phải có ít nhất 8 kí tự")
				return
			}


			else {
				$("#err-password-sign-up").text("")

			}


			if (passwordRepeat.trim() == "") {
				$("#err-repeat-password-sign-up").text("Mật khẩu nhập lại không được bỏ trống")
				return
			}

			else if (passwordRepeat !== password) {
				$("#err-repeat-password-sign-up").text("Mật khẩu nhập lại không chính xác")
				return
			}
			else {
				$("#err-repeat-password-sign-up").text("")
			}

			let signUpReq = {
				fullname: fullname,
				email: email,
				username: username,
				password: password,
				redirectUri: AuthSignUp.redirectUri,
				/*                passwordRepeat: passwordRepeat,*/
			}

			$.ajax({
				url: "/api/auth/signUp",
				type: "POST",
				dataType: "json",
				contentType: 'application/json',
				data: JSON.stringify(signUpReq)
			}).done(function(resp) {
				if (resp.status == RESULT_OK) {
					AuthSignUp.methods.handleRedirect();
				} else if (resp.status == RESULT_NG) {
					if (resp.message == EMAIL_EXIST) {
						$("#err-email-sign-up").text("Email đã được đăng ký")
					}
					if (resp.message == USERNAME_EXIST) {
						$("#err-username-sign-up").text("Username đã tồn tại")
					}

					$("#toast-mess").text("Đăng ký không thành công")
					$('#toast-container').show(0).delay(3000).hide(0);
				}
			}).fail(function(err) {
				$("#toast-mess").text("Đăng ký không thành công")
				$('#toast-container').show(0).delay(3000).hide(0);
			});
		},


		handleRedirect: () => {
			window.location.href = "noticeSuccess" + '?redirectUri=' + AuthSignUp.redirectUri;
		}
	}
}


function showPassword(e) {
	var input = document.getElementById('password-sign-up')
	if (input.type === 'password') {
		input.type = "text"
		e.target.className = "fas fa-eye"
	} else {
		input.type = "password"
		e.target.className = "fas fa-eye-slash"
	}
}
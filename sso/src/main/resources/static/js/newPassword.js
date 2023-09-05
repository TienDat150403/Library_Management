$(document).ready(async function () {
    AuthChangePassword.redirectUri = $("#redirectUri").val()
    
    $("#actionNewPassword").unbind();
    $("#actionNewPassword").click(function () {
        AuthChangePassword.methods.changePassword();
    });

    $("#repeatPassword").unbind();
    $("#repeatPassword").keyup(function (e) {
        if (e.keyCode == 13) {
            AuthChangePassword.methods.changePassword();
        }
    });
})

const AuthChangePassword = {
    redirectUri: "",
    methods: {
        changePassword: () => {
			
			const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
			
			const passwordRegex1 = /(?=.*[A-Za-z])/;
			const passwordRegex2 = /(?=.*\d)/
			const passwordRegex3 = /(?=.{8,})/
			
			let verifyKey = $("#verifyKey").val()
			
            let password = $("#password").val()
            let repeatPassword = $("#repeatPassword").val()

            if (password.trim() == "") {
                $("#err-passwrod-reset").text("Tài khoản không được bỏ trống")
                return;
            }
            
             if(!passwordRegex1.test(password)){
				$("#err-passwrod-reset").text("Mật khẩu phải có ít nhất 1 chữ cái")
                return;
			}
			
			if(!passwordRegex2.test(password)){
				$("#err-passwrod-reset").text("Mật khẩu phải có ít nhất 1 chữ số")
                return;
			}
			
            if(!passwordRegex3.test(password)){
				$("#err-passwrod-reset").text("Mật khẩu phải có ít nhất 8 kí tự")
                return;
			}
			
            $("#err-passwrod-reset").text("")

            if (repeatPassword.trim() == "") {
                $("#err-passwordRepeat-reset").text("Mật khẩu không được bỏ trống")
                return;
            }
            
            $("#err-passwordRepeat-reset").text("")
            
            if(repeatPassword !== password){
				$("#err-passwordRepeat-reset").text("Mật khẩu nhập lại không chính xác")
                return;
			}
            $("#err-passwordRepeat-reset").text("")

            let changePassword = {
				password: password,
				verifyKey: verifyKey
			}
			
            $.ajax({
                url: "/api/auth/changePassword",
                type: "POST",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(changePassword)
            }).done(function (resp) {
                if (resp.status == RESULT_OK) {
					AuthChangePassword.methods.handleRedirect();
                } else if (resp.status == RESULT_NG) {
						$("#toast-mess").text("Mail của bạn đã hết hạn để đổi mật khẩu")
                        $('#toast-container').show(0).delay(3000).hide(0);
                        AuthChangePassword.methods.handleRedirect();
					
                }
            }).fail(function (err) {
                $("#toast-mess").text("Tài khoản hoặc mật khẩu không chính xác")
                $('#toast-container').show(0).delay(3000).hide(0);
            });
        },

        handleRedirect: () => {
			window.location.href = "login" + '?redirectUri=' + AuthChangePassword.redirectUri;

		}
    }
}
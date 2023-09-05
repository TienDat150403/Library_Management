$(document).ready(async function () {
    AuthForgotPassword.redirectUri = $("#redirectUri").val()
    
    $("#actionForgotPassword").unbind();
    $("#actionForgotPassword").click(function () {
        AuthForgotPassword.methods.forgotPassword();
    });

    $("#email").unbind();
    $("#email").keyup(function (e) {
        if (e.keyCode == 13) {
            AuthForgotPassword.methods.forgotPassword();
        }
    });
})

const AuthForgotPassword = {
    redirectUri: "",
    methods: {
        forgotPassword: () => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			
            let username = $("#username").val()
            let email = $("#email").val()

            if (username.trim() == "") {
                $("#err-username-forgot").text("Tài khoản không được bỏ trống")
                return;
            }
            $("#err-username-forgot").text("")

            if (email.trim() == "") {
                $("#err-email-forgot").text("Email không được bỏ trống")
                return;
            }
            
            if(!emailRegex.test(email)){
				$("#err-email-forgot").text("Email không hợp lệ")
                return;
			}
			
            $("#err-email-forgot").text("")

            let forgotPasswordReq = {
                username: username,
                email: email,
                redirectUri: AuthForgotPassword.redirectUri
            }

            $.ajax({
                url: "/api/auth/forgotPassword",
                type: "POST",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(forgotPasswordReq)
            }).done(function (resp) {
				console.log(1)
				if(resp.status == RESULT_OK){
					AuthForgotPassword.methods.handleRedirect()
				}
				else if(resp.status == RESULT_NG){
					if(resp.message == EMAIL_DONT_EXIST){
						$("#err-email-forgot").text("Email không chính xác")
					}
					else if(resp.message == USERNAME_DONT_EXIST){
						$("#err-username-forgot").text("Tài khoản không chính xác")
					}
				}
            }).fail(function (err) {
				console.log(4)
                $("#toast-mess").text("Tài khoản hoặc email không chính xác")
                $('#toast-container').show(0).delay(3000).hide(0);
            });
        },

        handleRedirect: () => {
			window.location.href = "noticeForgotPass" + '?redirectUri=' + AuthForgotPassword.redirectUri;

		}
    }
}
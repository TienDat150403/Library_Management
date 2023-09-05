$(document).ready(async function () {
    AuthLogin.redirectUri = $("#redirectUri").val()
    
    $("#actionLogin").unbind();
    $("#actionLogin").click(function () {
        AuthLogin.methods.login();
    });

    $("#password").unbind();
    $("#password").keyup(function (e) {
        if (e.keyCode == 13) {
            AuthLogin.methods.login();
        }
    });
})

const AuthLogin = {
    redirectUri: "",
    methods: {
        login: () => {
            let username = $("#username").val()
            let password = $("#password").val()

            if (username.trim() == "") {
                $("#err-username-sign-in").text("Tài khoản không được bỏ trống")
                return;
            }
            $("#err-username-sign-in").text("")

            if (password.trim() == "") {
                $("#err-password-sign-in").text("Mật khẩu không được bỏ trống")
                return;
            }
            $("#err-password-sign-in").text("")

            let loginReq = {
                username: username,
                password: password
            }

            $.ajax({
                url: "/api/auth/login",
                type: "POST",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(loginReq)
            }).done(function (resp) {
				console.log(AuthLogin.redirectUri) //http:localhost:3002
                if (resp.status == RESULT_OK) {
                    AuthLogin.methods.handleRedirect(resp.responseData);
                } else if (resp.status == RESULT_NG) {
					if(resp.message == "Tài khoản chưa được xác thực"){
						AuthLogin.methods.handleRedirectLoginFail("noticeWarn");
					}
					else if(resp.message == "The username or password is wrong"){
						console.log("The username or password is wrong")
						$("#err-password-sign-in").text("Tài khoản hoặc mật khẩu không chính xác")
						$("#toast-mess").text("Tài khoản hoặc mật khẩu không chính xác")
                        $('#toast-container').show(0).delay(3000).hide(0);
					}
                    
                }
            }).fail(function (err) {
                $("#toast-mess").text("Tài khoản hoặc mật khẩu không chính xác")
                $('#toast-container').show(0).delay(3000).hide(0);
            });
        },

        handleRedirect: (accessToken) => {
            window.location.href = AuthLogin.redirectUri + '?access_token=' + accessToken;
        },
        
        handleRedirectLoginFail: () => {
			window.location.href = "noticeWarn" + '?redirectUri=' + AuthLogin.redirectUri;

		}
    }
}
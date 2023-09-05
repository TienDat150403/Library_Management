package com.a2m.sso.constant;

/**
 * Author tiennd
 * Created date 2023-07-08
 */
public class CommonConstants {

    public static final String RESULT_OK = "OK"; // success
    public static final String RESULT_WN = "WN"; // warning
    public static final String RESULT_NG = "NG"; // not good
    public static final String RESULT_OTP_2FA = "OTP_2FA";
    public static final String RESULT_OTP_EMAIL = "OTP_EMAIL";
    public static final String SEQ_NAME = "SEQ_USER_UID";
//    public static final String SEQ_NAME = "seq_user_uid";
    public static final String ACTION_LOGOUT_TYPE = "logout";
    public static final String EMAIL_EXIST = "EMAIL_EXIST";
    public static final String USERNAME_EXIST = "USERNAME_EXIST";
    public static final String EMAIL_DONT_EXIST = "EMAIL_DONT_EXIST";
    public static final String USERNAME_DONT_EXIST = "USERNAME_DONT_EXIST";

    public enum UserStatus {
        LOCKED("02-01"), DISABLED("02-02"), ACTIVED("02-03"), NOT_ACTIVED("02-04");

        private String status;

        private UserStatus(String status) {
            this.status = status;
        }

        public String getStatus() {
            return status;
        }
    }
}

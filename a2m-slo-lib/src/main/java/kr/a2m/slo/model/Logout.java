package kr.a2m.slo.model;

/**
 * @author tiennd
 */

public class Logout {
    private String userUid;
    private Long logoutTime;
    private Long offsetTimeZone;

    public Logout() {
    }

    public String getUserUid() {
        return userUid;
    }

    public void setUserUid(String userUid) {
        this.userUid = userUid;
    }

    public Long getLogoutTime() {
        return logoutTime;
    }

    public void setLogoutTime(Long logoutTime) {
        this.logoutTime = logoutTime;
    }

    public Long getOffsetTimeZone() {
        return offsetTimeZone;
    }

    public void setOffsetTimeZone(Long offsetTimeZone) {
        this.offsetTimeZone = offsetTimeZone;
    }
}

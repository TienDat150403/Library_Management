package kr.a2m.slo.service.impl;

import kr.a2m.slo.config.MariadbConnection;
import kr.a2m.slo.model.Logout;
import kr.a2m.slo.service.LogoutService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * @author tiennd
 */
public class LogoutServiceImpl implements LogoutService {

    @Override
    public int logout(String userUid) throws Exception {
        Connection conn = MariadbConnection.getInstance().getConnection();
        Logout logout = new Logout();
        try {
            PreparedStatement statement = conn.prepareStatement("SELECT * FROM SLO_LOGOUT WHERE USER_UID = ?");
            statement.setString(1, userUid);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                logout.setUserUid(resultSet.getString(1));
                logout.setLogoutTime(resultSet.getLong(2));
                logout.setOffsetTimeZone(resultSet.getLong(3));
            }
            TimeZone zone = TimeZone.getDefault();
            if (logout.getUserUid() != null) {
                // update
                String sql = "UPDATE SLO_LOGOUT SET LOGOUT_TIME = ?,OFFSET_TIMEZONE = ? WHERE USER_UID = ?";
                PreparedStatement prestm = conn.prepareStatement(sql);
                prestm.setLong(1, (new Date().getTime()));
                prestm.setLong(2, zone.getOffset(Calendar.ZONE_OFFSET));
                prestm.setString(3, userUid);
                prestm.execute();
            } else {
                // ínsert
                String sql = "INSERT INTO SLO_LOGOUT (USER_UID, LOGOUT_TIME, OFFSET_TIMEZONE) VALUES (?, ?, ?)";
                PreparedStatement prestm = conn.prepareStatement(sql);
                prestm.setLong(2, (new Date().getTime()));
                prestm.setLong(3, zone.getOffset(Calendar.ZONE_OFFSET));
                prestm.setString(1, userUid);
                prestm.executeUpdate();
            }
            statement.close();
            resultSet.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
            return 0;
        } finally {
            try {
                conn.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
        return 1;
    }

    @Override
    public Logout getLogout(String userUid) throws Exception {
        Connection conn = MariadbConnection.getInstance().getConnection();
        Logout logout = new Logout();
        try {
            PreparedStatement statement = conn.prepareStatement("SELECT * FROM SLO_LOGOUT WHERE USER_UID = ?");
            statement.setString(1, userUid);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                logout.setUserUid(resultSet.getString(1));
                logout.setLogoutTime(resultSet.getLong(2));
                logout.setOffsetTimeZone(resultSet.getLong(3));
            }
            statement.close();
            resultSet.close();
        } catch (SQLException ex) {
            return null;
        } finally {
            try {
                conn.close();
            } catch (SQLException ex) {

            }
        }
        return logout;
    }
}

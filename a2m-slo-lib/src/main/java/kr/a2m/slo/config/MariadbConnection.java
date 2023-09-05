package kr.a2m.slo.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * @author tiennd
 */
public class MariadbConnection {

    private static MariadbConnection _instance = null;
    private static String url = "";
    private static String user = "";
    private static String pass = "";

    public static MariadbConnection getInstance() {
        if (_instance == null) {
            _instance = new MariadbConnection();
        }
        return _instance;
    }

    public void init(String url, String user, String pass) {
        this.url = url;
        this.user = user;
        this.pass = pass;
    }

    public Connection getConnection() {
        try {
            return DriverManager.getConnection(url, user, pass);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

}

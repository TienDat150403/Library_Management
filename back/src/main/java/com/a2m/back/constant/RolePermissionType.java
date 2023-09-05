package com.a2m.back.constant;

/**
 * Author tiennd
 * Created date 2023-07-15
 */
public enum RolePermissionType {

    ROLE_ADMIN("R000"), ROLE_NORMAL("R001");

    private String role;

    RolePermissionType(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}

package com.a2m.back.util;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

/**
 * Author tiennd
 * Created date 2023-07-08
 */
public class RsaUtils {

    public static PublicKey getPublicKey() throws Exception {
        byte[] keyBytes = getBytePublicKey();
        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PublicKey key = keyFactory.generatePublic(spec);
        return key;
    }

    public static byte[] getBytePublicKey() throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("rsa/publicKey.rsa");
        byte[] publicKeyBytes = FileCopyUtils.copyToByteArray(classPathResource.getInputStream());
        return publicKeyBytes;
    }

}

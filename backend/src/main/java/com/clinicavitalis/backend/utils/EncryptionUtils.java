package com.clinicavitalis.backend.utils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.util.Base64;

public class EncryptionUtils {

    private static final String ALGORITHM = "AES";
    private static final String KEY_FILE = "src/main/resources/secret.key";

    public static SecretKey generateKey() throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance(ALGORITHM);
        keyGenerator.init(128, new SecureRandom());
        return keyGenerator.generateKey();
    }

    public static SecretKey getSecretKey() throws Exception {
        if (Files.exists(Paths.get(KEY_FILE))) {
            byte[] keyBytes = Files.readAllBytes(Paths.get(KEY_FILE));
            return new SecretKeySpec(keyBytes, ALGORITHM);
        } else {
            SecretKey key = generateKey();
            Files.write(Paths.get(KEY_FILE), key.getEncoded());
            return key;
        }
    }

    public static String encrypt(String data, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedData = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    public static String decrypt(String encryptedData, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decryptedData = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
        return new String(decryptedData);
    }

}

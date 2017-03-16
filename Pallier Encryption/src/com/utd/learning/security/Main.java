package com.utd.learning.security;

import paillierp.Paillier;
import paillierp.key.KeyGen;
import paillierp.key.PaillierKey;
import paillierp.key.PaillierPrivateKey;

import java.io.File;
import java.math.BigInteger;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {

    private static Paillier esystem;

    public static void main(String[] args) {
        System.out.println("******* Paillier Encryption Start *******");
        if (args.length < 5) {
            System.out.println("Not enough arguments!! Retry...");
            System.exit(1);
        }

        esystem = new Paillier();

        try {
            System.out.println(Arrays.toString(args));
            switch (args[0]) {
                case "-keygen":
                    System.out.println("Generating Public and Private keys... ");
                    generateKeys(args[2], args[4]);
                    break;
                case "-encrypt":
                    System.out.println("Encrypt... ");
                    encrypt(args[2], args[4], args[6]);
                    break;
                case "-process":
                    System.out.println("Process... ");
                    process(args[2], args[4], args[6]);
                    break;
                case "-decrypt":
                    System.out.println("Decrypt... ");
                    decrypt(args[2], args[4], args[6]);
                    break;
                default:
                    System.out.println("Incorrect format\n Try passing valid command line arguments!");
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e);
            e.printStackTrace();
        }
        System.out.println("******* Paillier Encryption End *******");
    }


    /**
     * Method to generate keys
     *
     * @param publicKeyFile
     * @param privateKeyFile
     */
    private static void generateKeys(String publicKeyFile, String privateKeyFile) {
        PaillierPrivateKey key = KeyGen.PaillierKey(1024, 9876543);
        esystem.setDecryptEncrypt(key);
        System.out.println("Private Key 1: " + Arrays.toString(esystem.getPrivateKey().toByteArray()));
        System.out.println("Private Key 2: " + Arrays.toString(key.toByteArray()));
        System.out.println("Public Key: " + Arrays.toString(esystem.getPublicKey().toByteArray()));
        Utils.writeToFile(publicKeyFile, esystem.getPublicKey().toByteArray());
        Utils.writeToFile(privateKeyFile, esystem.getPrivateKey().toByteArray());
        System.out.println("Keys are generated...");
    }

    /**
     * Method to encrypt E(x), E(x2) using the public key for the input from the plain text file and write to the cipher text file
     *
     * @param publicKeyFile
     * @param plainTxtFile
     * @param cipherTxtFile
     */
    private static void encrypt(String publicKeyFile, String plainTxtFile, String cipherTxtFile) {
        byte[] bytes = Utils.readBytesFromFile(publicKeyFile);
        System.out.println("Key: " + Arrays.toString(bytes));
        PaillierKey pKey = new PaillierKey(bytes, 1234567);
        esystem.setEncryption(pKey);
        List<Integer> numList = Utils.readIntListFromFile(plainTxtFile);
        List<String> cipherList = new ArrayList<>();
        for (int num : numList) {
            BigInteger plainText = BigInteger.valueOf(num);
            System.out.println("number chosen  : " + plainText.toString());
            BigInteger cipherText = esystem.encrypt(plainText);
            System.out.println("Cipher text: " + cipherText);
            System.out.println("Multiply: " + esystem.multiply(cipherText, num));
            cipherList.add(cipherText.toString() + "," + esystem.multiply(cipherText, num).toString());
        }
        Utils.writeToFile(cipherTxtFile, cipherList);
    }

    /**
     * Method to compute sum of E[x], sum of E[x2], and sum of counts and write to output file
     *
     * @param publicKeyFile
     * @param cipherTxtFile
     * @param outputFile
     */
    private static void process(String publicKeyFile, String cipherTxtFile, String outputFile) {

        StringBuffer buffer;

        // 1. Get the public Key & Set
        byte[] bytes = Utils.readBytesFromFile(publicKeyFile);
        System.out.println("Key: " + Arrays.toString(bytes));
        PaillierKey pKey = new PaillierKey(bytes, 1234567);
        esystem.setEncryption(pKey);

        // 2. Read the encrypted lines
        File inputFile = new File(cipherTxtFile);
        List<String> outputLines = new ArrayList<>();
        List<String> lines = null;
        try {
            lines = Files.readAllLines(inputFile.toPath());
        } catch (Exception e) {
            System.err.println("Exception in readIntArrayFromFile() method" + e.getLocalizedMessage());
        }

        for (String line : lines) {
            buffer = new StringBuffer();
            outputLines.add(line);
            String[] values = line.split(",");
            BigInteger val = new BigInteger(values[0]);
            // 3. Calculate Encrypted Sum
            buffer.append(esystem.add(val, val).toString());
            buffer.append(",");

            // 4. Calculate Encrypted Sum of squares
            val = new BigInteger(values[1]);
            buffer.append(esystem.add(val, val).toString());
//            buffer.append(",");

            // 5. Calculate Encrypted count
            // TODO: 4/15/16 what is count
            outputLines.add(buffer.toString());
        }

        Utils.writeToFile(outputFile, outputLines);
    }


    /**
     * Method to decrpyt the Cipertext file using the private key file and write plain text to the output file
     *
     * @param privateKeyFile
     * @param cipherTxtFile
     * @param plainTxtFile
     */
    private static void decrypt(String privateKeyFile, String cipherTxtFile, String plainTxtFile) {
        StringBuffer buffer;
        // 1. Get the Private Key & Set
        byte[] bytes = Utils.readBytesFromFile(privateKeyFile);
        PaillierPrivateKey privateKey = new PaillierPrivateKey(bytes, 1234567);
        esystem = new Paillier();
        esystem.setDecryptEncrypt(privateKey);

        // 2. Get all the lines from cipher text file
        File inputFile = new File(cipherTxtFile);
        List<String> outputLines = new ArrayList<>();
        List<String> lines = null;
        try {
            lines = Files.readAllLines(inputFile.toPath());
        } catch (Exception e) {
            System.err.println("Exception in readIntArrayFromFile() method" + e.getLocalizedMessage());
        }

        for (int i = 0; i < lines.size(); i++) {
            buffer = new StringBuffer();
            System.out.println("--------------------------------------------------");
            String[] values = lines.get(i).split(",");
            System.out.println("Size: " + values);

            //3. Decrypt D[e(x)]
            System.out.println("E(x) " + values[0]);
            BigInteger val = new BigInteger(values[0]);
            System.out.println("x: " + esystem.decrypt(val).toString());
            buffer.append(esystem.decrypt(val).toString());
            buffer.append(",");

            //4. Decrypt D[e(x2)]
            System.out.println("E(x2) " + values[1]);
            val = new BigInteger(values[1]);
            System.out.println("x2: " + esystem.decrypt(val).toString());
            buffer.append(esystem.decrypt(val).toString());
            buffer.append(",");

            // Read the next line
            i++;
            values = lines.get(i).split(",");
            System.out.println("Size: " + values);

            // 5. Decrypt sum of x
            System.out.println("Sum[E(x) + E(x)]:" + values[0]);
            val = new BigInteger(values[0]);
            System.out.println("(x + x): " + esystem.decrypt(val).toString());
            buffer.append(esystem.decrypt(val).toString());
            buffer.append(",");

            // 5. Decrypt sum of x2
            System.out.println("Sum[E(x) + E(x)]" + values[1]);
            val = new BigInteger(values[1]);
            System.out.println("(x2 + x2): " + esystem.decrypt(val).toString());
            buffer.append(esystem.decrypt(val).toString());
            buffer.append(",");

            System.out.println(buffer.toString());
            outputLines.add(buffer.toString());
            System.out.println("--------------------------------------------------");
        }

        Utils.writeToFile(plainTxtFile, outputLines);
    }

}

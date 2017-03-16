package com.utd.learning.security;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.math.BigInteger;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Subbu on 4/14/16.
 */
public class Utils {

    public static void writeToFile(String fileName, String content) {
        File input = new File(fileName);
        try (FileWriter writer = new FileWriter(input)) {
            writer.write(content);
        } catch (Exception e) {
            System.err.println("Exception in writeToFile() method" + e.getLocalizedMessage());
        }
    }

    public static void writeToFile(String fileName, List<String> lines) {
        File input = new File(fileName);
        try (FileWriter writer = new FileWriter(input)) {
            for (String line : lines) {
                writer.write(line + "\n");
            }
        } catch (Exception e) {
            System.err.println("Exception in writeToFile() method" + e.getLocalizedMessage());
        }
    }

    public static void writeToFile(String fileName, byte[] bytes) {
        File outputFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(outputFile)) {
            fos.write(bytes);
            fos.close();
        } catch (Exception e) {
            System.err.println("Exception in writeToFile() method" + e.getLocalizedMessage());
        }
    }

    public static byte[] readBytesFromFile(String fileName) {
        byte[] bytes = null;
        File inputFile = new File(fileName);
        try {
            bytes = Files.readAllBytes(inputFile.toPath());
        } catch (Exception e) {
            System.err.println("Exception in readBytesFromFile() method" + e.getLocalizedMessage());
        }

        return bytes;
    }

    public static List<Integer> readIntListFromFile(String fileName) {
        List<String> lines = null;
        List<Integer> numbers = null;
        File inputFile = new File(fileName);
        try {
            lines = Files.readAllLines(inputFile.toPath());
        } catch (Exception e) {
            System.err.println("Exception in readIntArrayFromFile() method" + e.getLocalizedMessage());
        }

        if (lines != null) {
            numbers = new ArrayList<>();
            for (String str : lines) {
                numbers.add(Integer.parseInt(str));
            }
        }

        return numbers;
    }

    public static List<BigInteger> readBigIntListFromFile(String fileName) {
        List<String> lines = null;
        List<BigInteger> numbers = null;
        File inputFile = new File(fileName);
        try {
            lines = Files.readAllLines(inputFile.toPath());
        } catch (Exception e) {
            System.err.println("Exception in readIntArrayFromFile() method" + e.getLocalizedMessage());
        }

        if (lines != null) {
            numbers = new ArrayList<>();
            for (String str : lines) {
                numbers.add(new BigInteger(str));
            }
        }

        return numbers;
    }

}

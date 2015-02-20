package com.learning.security;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileUtils {
	/**
	 * Utility method to write content to the file
	 * @param fileName : Filename
	 * @param msg : text to be written
	 */
	public static void writeFile(String fileName, String msg){
		System.out.println("Writing "+msg+" to file "+fileName);
		Charset charset = Charset.forName("US-ASCII");
		Path path = Paths.get(fileName);
		if (Files.notExists(path)) {
			System.out.println("File doesnot exist");
			System.out.println("Creating CipherText file");
			File file = new File(fileName);
		}
		try (BufferedWriter writer = Files.newBufferedWriter(path, charset)) {
			writer.write(msg, 0, msg.length());
		} catch (IOException x) {
			System.err.format("IOException: %s%n", x);
		}
	}
	
	/**
	 * Utility Method to read contents from the file
	 * @param fileName : filename
	 * @return String : content of the message
	 */
	public static String readFile(String fileName){
		System.out.println("Reading from File: "+fileName);
		Charset charset = Charset.forName("US-ASCII");
		Path path = Paths.get(fileName);
		String line = null, msg = "";
		if (Files.exists(path)) {
			try (BufferedReader reader = Files.newBufferedReader(path, charset)) {
				while ((line = reader.readLine()) != null) {
					msg+=line;
				}
			} catch (IOException x) {
				System.err.format("IOException: %s%n", x);
			}
		}
		return msg;
	}
}

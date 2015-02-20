package com.learning.security;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.TreeMap;

public class ADFGVXCipher {

	static char cipherSquare[][];
	static char cipherMatrix[][];
	
	private static char[] cipherKeyChars = {'A','D','F','G','V','X'};

	/**
	 * static method to initialize the matrix
	 */
	private static void initMatrix() {
		cipherSquare = new char[6][6];
		for (int i = 0; i < 6; i++) {
			for (int j = 0; j < 6; j++) {
				cipherSquare[i][j] = '*';
			}
		}
	}
	
	/**
	 * static method to initialize the cipher matrix
	 */
	private static void initCipherMatrix() {
		System.out.println("ADFGVXCipher.initCipherMatrix() entry");
		String line = null;
		String fileName = "cipherMatrix.txt";
		Charset charset = Charset.forName("US-ASCII");
		Path path = Paths.get(fileName);
		if (Files.notExists(path)) {
			System.out.println("File doesnot exist");
			System.out.println("Creating Cipher file");
			// Assign 0-9 in random positions in Matrix Cipher
			initCipherMatrix(48, 57);
			// Assign a-z in random positions in Matrix Cipher
			initCipherMatrix(97, 122);
			try (BufferedWriter writer = Files.newBufferedWriter(path, charset)) {
				for (int i = 0; i < 6; i++) {
					line="";
					for (int j = 0; j < 6; j++) {
						line += cipherSquare[i][j];
					}
					line+="\n";
					writer.write(line, 0, line.length());
				}
			} catch (IOException x) {
				System.err.format("IOException: %s%n", x);
			}
		}
		System.out.println("Cipher File exists");
		try (BufferedReader reader = Files.newBufferedReader(path, charset)) {
			int row = 0;
			while ((line = reader.readLine()) != null) {
				for (int i = 0; i < line.length(); i++) {
					cipherSquare[row][i] = line.charAt(i);
				}
				row++;
			}
		} catch (IOException x) {
			System.err.format("IOException: %s%n", x);
		}
		System.out.println("ADFGVXCipher.initCipherMatrix() exit");
	}

	/**
	 * static method to initialize the cipher matrix
	 * 
	 * @param begin
	 * @param end
	 */
	private static void initCipherMatrix(int begin, int end) {
		System.out.println("ADFGVXCipher.initCipherMatrix(" + (char) begin
				+ "," + (char) end + ") entry");
		while (begin <= end) {
			int row = randInt();
			int col = randInt();
			char ch = cipherSquare[row][col];
			if (ch == '*') {
				ch = (char) begin;
				begin++;
				cipherSquare[row][col] = ch;
			} else {
				continue;
			}
		}
		System.out.println("ADFGVXCipher.initCipherMatrix() exit");
	}

	/**
	 * Method to return random Integer between 0 & 5
	 * 
	 * @return : random integer between 0 & 5
	 */
	public static int randInt() {
		int max = 5, min = 0;
		Random rand = new Random();
		int randomNum = rand.nextInt((max - min) + 1) + min;
		return randomNum;
	}

	/**
	 * Method to print the Cipher Square
	 */
	private static void printMatrix() {
		System.out.println("  0 1 2 3 4 5");
		for (int i = 0; i < 6; i++) {
			System.out.print(i + " ");
			for (int j = 0; j < 6; j++) {
				System.out.print(cipherSquare[i][j] + " ");
			}
			System.out.println();
		}
	}

	/**
	 * Mehtod to print the cipher matrix created in encryption
	 * 
	 * @param row
	 * @param col
	 */
	private static void printCipherMatrix(int row, int col) {
		System.out.println();
		for (int i = 0; i < row; i++) {
			for (int j = 0; j < col; j++) {
				System.out.print(cipherMatrix[i][j] + " ");
			}
			System.out.println();
		}
	}

	/**
	 * Method to find the position of the given character in the cipher square
	 * 
	 * @param ch
	 *            : character to be found
	 * @return String : Position of the character in the cipher square in the
	 *         form of 'row+col'
	 */
	private static String findMyPosition(char ch) {
		String pos = null;
		for (int i = 0; i < 6; i++) {
			for (int j = 0; j < 6; j++) {
				if (ch == cipherSquare[i][j]) {
					pos = cipherKeyChars[i] + "" + cipherKeyChars[j];
				}
			}
		}
		return pos;
	}
	
	/**
	 * Method to find the Index of the given character in the Cipher key
	 * characters[A,D,F,V,G,X]
	 * 
	 * @param ch
	 *            : Character to be found
	 * @return int : position of the character
	 */
	private static int findMyIndex(char ch){
		int pos=-1;
		for(int i=0;i<cipherKeyChars.length;i++){
			if(ch==cipherKeyChars[i])
				pos = i;
		}
		return pos;
	}

	/**
	 * Method to decrypt the message
	 * 
	 * @param cipherText
	 *            : Cipher text to be decrypted
	 * @param secret
	 *            : secret key to be used
	 * @return String : decrypted text
	 */
	private static String decryptMsg(String cipherText, String secret) {
		System.out.println("ADFGVXCipher.decryptMsg() entry");
		System.out.println("Message to be decrypted: "+cipherText);
		String plainText = "";
		System.out.println("ADFGVX Decryption Phase I");
		cipherText = reshuffleList(cipherText, secret);
		System.out.println("ADFGVX Decryption Phase III");
		int i = 0;
		while (i < cipherText.length()) {
			int row = findMyIndex(cipherText.charAt(i++));
			int col = findMyIndex(cipherText.charAt(i++));
			plainText += cipherSquare[row][col];
		}
		System.out.println("ADFGVXCipher.decryptMsg() exit");
		return plainText;
	}

	/**
	 * Method to reshuffle the matrix; Used in decryption
	 * 
	 * @param cipherText
	 *            : Encrypted text
	 * @param secret
	 *            : secret key used for decryption
	 * @return String : Intermediate decrypted text
	 */
	private static String reshuffleList(String cipherText, String secret) {
		int i = 0;
		String line = null;
		Map<Character, String> hashMsgMap = new HashMap<Character, String>();
		int numRows = cipherText.length() / secret.length();
		System.out.println("Rows: " + numRows);
		char[] secArray = secret.toCharArray();
		Arrays.sort(secArray);
		int k = 0;
		while (i < cipherText.length()) {
			line = "";
			for (int j = 0; j < numRows; j++) {
				char ch = cipherText.charAt(i++);
				if (ch != '*')
					line += "" + ch;
			}
			hashMsgMap.put(secArray[k++], line);
		}

		System.out.println("Sorted");
		for (Map.Entry<Character, String> entry : hashMsgMap.entrySet()) {
			System.out.println(entry.getKey() + " : "
					+ entry.getValue());
		}
		System.out.println("ADFGVX Decryption Phase I Completed");
		System.out.println("---------------------------------------");
		System.out.println("ADFGVX Decryption Phase II");
		String strArray[] = new String[numRows];
		for (i = 0; i < strArray.length; i++)
			strArray[i] = "";
		for (i = 0; i < secret.length(); i++) {
			k = 0;
			String str = hashMsgMap.get(secret.charAt(i));
			for (int j = 0; j < str.length(); j++) {
				char ch = str.charAt(j);
				strArray[k] += "" + ch;
				k++;
			}
		}
		
		line = "";
		for (String str : strArray) {
			line += str;
		}

		return line;
	}

	/**
	 * Method to encrypt the plain text with the secret message using ADFVGX
	 * Cipher
	 * 
	 * @param plainText
	 *            : message to be encrypted
	 * @param secret
	 *            : secret key used in encryption
	 * @return String : encrypted text msg
	 */
	private static String encryptMsg(String plainText, String secret) {
		System.out.println("ADFGVXCipher.encryptMsg() entry");
		System.out.println("Encrypting the message: "+plainText+" with the secret: "+secret);
		String cipherText = "";
		char ch;
		System.out.println("ADFGVX Encryption Phase I");
		for (int i = 0; i < plainText.length(); i++) {
			ch = plainText.charAt(i);
			cipherText += findMyPosition(ch);
		}
		System.out.println("CipherText-I: " + cipherText);
		System.out.println("ADFGVX Encryption Phase 1 Completed");
		System.out.println("---------------------------------------");
		System.out.println("ADFGVX Encryption Phase II");
		int secretLength = secret.length();
		int cipherLength = cipherText.length();
		int row = (int) Math.ceil((double) cipherLength / secretLength);
		System.out.println("Rows:" + row + " cols:" + secretLength);
		cipherMatrix = new char[row][secretLength];
		int i = 0, j = 0;
		for (int k = 0; k < cipherLength; k++) {
			cipherMatrix[i][j++] = cipherText.charAt(k);
			if (j == secretLength) {
				i++;
				j = 0;
			}
		}
		if (j != 0) {
			for (; j < secretLength; j++)
				cipherMatrix[i][j] = '*';
		}
		for (i = 0; i < secretLength; i++)
			System.out.print(secret.charAt(i) + " ");
		printCipherMatrix(row, secretLength);
		System.out.println("ADFGVX Encryption Phase II completed");
		System.out.println("---------------------------------------");
		System.out.println("ADFGVX Encryption Phase III");
		List<String> strList = shuffleCipherMatrix(row, secret);
		System.out.println("ADFGVX Encryption Phase III completed");
		System.out.println("---------------------------------------");
		System.out.println("ADFGVX Encryption Phase IV");
		cipherText = "";
		for (String str : strList) {
			System.out.println(str);
			for (i = 0; i < str.length(); i++) {
				cipherText += str.charAt(i);
			}
		}
		System.out.println("ADFGVX Encryption Phase IV completed");
		System.out.println("ADFGVXCipher.encryptMsg() exit");
		return cipherText;
	}

	/**
	 * Method to shuffle the Matrix; Used in Encryptions
	 * 
	 * @param row
	 * @param secret
	 * @return
	 */
	private static List<String> shuffleCipherMatrix(int row, String secret) {
		System.out.println("ADFGVXCipher.shuffleCipherMatrix() entry");
		List<String> strList = new ArrayList<String>();
		Map<Character, String> hashMsgMap = new HashMap<Character, String>();
		String line = null;
		int k = 0;
		for (int i = 0; i < secret.length(); i++) {
			line = "";
			for (int j = 0; j < row; j++) {
				line += cipherMatrix[j][i];
			}
			hashMsgMap.put(secret.charAt(k++), line);
		}
		System.out.println("Unsorted");
		
		for (Map.Entry<Character, String> entry : hashMsgMap.entrySet()) {
			System.out.println(entry.getKey() + " : "
					+ entry.getValue());
		}
		System.out.println("Sorted");
		Map<Character, String> treeMap = new TreeMap<Character, String>(
				hashMsgMap);
		for (Map.Entry<Character, String> entry : treeMap.entrySet()) {
			System.out.println(entry.getKey() + " : "
					+ entry.getValue());
			strList.add(entry.getValue());
		}

		System.out.println("ADFGVXCipher.shuffleCipherMatrix() exit");
		return strList;
	}

	/**
	 * Starting point of the program
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		System.out.println("ADFGVXCipher.main() entry");
		int choice;
		try(BufferedReader reader = new BufferedReader(new InputStreamReader(
				System.in));){
			initMatrix();
			initCipherMatrix();
			printMatrix();
			do{
				System.out.println("-----------------------------------");
				System.out.println("ADFVGX Cipher");
				System.out.println("Enter the secret:");
				String secret = reader.readLine();
				
				System.out.println("Enter the msg to be encrypted:");
				String plainText = reader.readLine();
				plainText = plainText.replaceAll("\\s","");
				System.out.println("-----------------------------------");
				System.out.println("Secret: " + secret);
				System.out.println("Plain Text:" + plainText);
				
				// Removing duplicate letters from secret
				char[] secArray = secret.toCharArray();
				Set<Character> charSet = new LinkedHashSet<Character>();
				for (char c : secArray) {
					charSet.add(c);
				}
				secret = "";
				for (Character ch : charSet) {
					secret += ch;
				}

				System.out.println("Secret: " + secret);
				String cipherText = encryptMsg(plainText, secret);
				System.out.println("Encrypted Text: " + cipherText);
				System.out.println("-----------------------------------");
				plainText = decryptMsg(cipherText, secret);
				System.out.println("Decrypted Msg: " + plainText);
				System.out.println("-----------------------------------");
				System.out.println("Press 0 to exit");
				choice = Integer.parseInt(reader.readLine());
				if(choice==0)
					break;
			}while(true);
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("ADFGVXCipher.main() exit");
	}

}

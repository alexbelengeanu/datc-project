using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace api
{
    class ConversionHandler
    {
        public byte[] StringToByteArray(string s) {
            return CharArrayToByteArray(s.ToCharArray());
        }
        public byte[] CharArrayToByteArray(char[] array) {
            return Encoding.ASCII.GetBytes(array, 0, array.Length);
        }
        public string ByteArrayToString(byte[] array) {
            return Encoding.ASCII.GetString(array);
        }
        public string ByteArrayToHexString(byte[] array) {
            string s = "";
            int i;
            for (i = 0; i < array.Length; i++) {
                s = s + NibbleToHexString((byte)((array[i] >> 4) & 0x0F)) + NibbleToHexString((byte)(array[i] & 0x0F));
            }
            return s;
        }
        public byte[] HexStringToByteArray(string s) {
            byte[] array = new byte[s.Length / 2];
            char[] chararray = s.ToCharArray();
            int i;
            for (i = 0; i < s.Length / 2; i++) {
                array[i] = (byte)(((HexCharToNibble(chararray[2 * i]) << 4) & 0xF0) | ((HexCharToNibble(chararray[2 * i + 1]) & 0x0F)));
            }
            return array;
        }
        public string NibbleToHexString(byte nib) {
            string s;
            if (nib < 10) {
                s = nib.ToString();
            }
            else {
                char c = (char)(nib + 55);
                s = c.ToString();
            }
            return s;
        }
        public byte HexCharToNibble(char c) {
            byte value = (byte)c;
            if (value < 65) { 
                value = (byte)(value - 48);
 
            }
            else {
                value = (byte)(value - 55);
            }
            return value;
        }
    }
}
#pragma warning disable SYSLIB0021

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;

namespace api
{
    class MACHandler
    {
        private HMAC myMAC;
        private HashAlgorithm myHash;

        public MACHandler() {
            myMAC = new System.Security.Cryptography.HMACSHA256();
            myHash = new SHA256CryptoServiceProvider();
        }

        public bool CheckAuthenticity(byte[] mes, byte[] mac, byte[] key) {
            myMAC.Key = key;
            if (CompareByteArrays(myMAC.ComputeHash(mes), mac, myMAC.HashSize / 8) == true) {
                return true;
            }
            else {
                return false;
            }
        }

        public byte[] ComputeMAC(byte[] mes, byte[] key)
        {
            myMAC.Key = key;
            return myMAC.ComputeHash(mes);
        }

        public byte[] ComputeHash(byte[] mes)
        {
            return myHash.ComputeHash(mes);
        }

        public int MACByteLength()
        {
            return myMAC.HashSize / 8;
        }

        private bool CompareByteArrays(byte[] a, byte[] b, int len)
        {
            for (int i = 0; i < len; i++)
                if (a[i] != b[i]) 
                    return false;
            return true;
        }
    }
}

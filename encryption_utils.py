from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64

# Encryption key (32 bytes for AES-256)
ENCRYPTION_KEY = b'your-32-byte-long-encryption-key-goes-here'

# Encrypt data
def encrypt_data(data):
    cipher = AES.new(ENCRYPTION_KEY, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(data.encode('utf-8'), AES.block_size))
    return base64.b64encode(cipher.iv + ct_bytes).decode('utf-8')

# Decrypt data
def decrypt_data(enc_data):
    enc_data = base64.b64decode(enc_data)
    iv = enc_data[:16]
    ct = enc_data[16:]
    cipher = AES.new(ENCRYPTION_KEY, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(ct), AES.block_size).decode('utf-8')
  

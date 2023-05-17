import socket

tcp_socket = socket.socket(socket.AF_INET,
                           socket.SOCK_STREAM)

udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

header = None
addr = ("127.0.0.1", 5000)

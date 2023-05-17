import sys
from multiprocessing import Value

from configure import tcp_socket, addr, udp_socket
from utils import States
import utils


def send_udp(message):
    udp_socket.sendto(message, addr)


class Client:
    def __init__(self):
        self.seq_count = 0
        tcp_socket.connect(addr)
        self.data = "Hello"
        self.last_received_ack = None
        self.client_state = States.CLOSED
        # self.handshake()

    @staticmethod
    def send_udp(message):
        udp_socket.sendto(message, addr)

    def handshake(self):
        if self.client_state == States.CLOSED or self.client_state == States.SYN_SENT:
            seq_num = utils.rand_int()
            syn_header = utils.Header(seq_num, 0, syn=1, ack=0, message=self.data)
            self.send_udp(syn_header.bits(False))
            self.update_state(States.SYN_SENT)
        else:
            pass

    def terminate(self):
        pass

    def update_state(self, new_state):
        if utils.DEBUG:
            print(self.client_state, '->', new_state)
        self.client_state = new_state

    def run(self):
        while True:
            self.data = input('write to server: ')
            if not self.data:
                tcp_socket.close()
                sys.exit(1)
            self.handshake()
            self.data = udp_socket.recv(1024)
            self.data = self.data.decode('utf-8')
            print(self.data)

            # tcp_socket.close()


if __name__ == "__main__":
    client = Client()
    client.run()

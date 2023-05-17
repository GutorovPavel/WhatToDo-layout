import utils
from configure import tcp_socket, udp_socket, addr, header
from utils import States


class Server:
    def __init__(self):
        self.server_state = States.CLOSED
        self.seq_count = 0
        tcp_socket.bind(addr)
        tcp_socket.listen(1)
        udp_socket.bind(addr)
        self._header = header

    def update_server_state(self, new_state):
        if utils.DEBUG:
            print(self.server_state, '->', new_state)
        self.server_state = new_state

    def recv_msg(self):
        data, addr = udp_socket.recvfrom(1024)
        print(data)
        self._header = utils.bits_to_header(data)
        body = utils.get_body_from_data(data)
        return body, addr

    def run(self):
        while True:
            if self.server_state == States.CLOSED:
                question = input('Do you want to quit? y\\n: ')
                if question == 'y':
                    break
                print('wait connection...')
                conn, addr = tcp_socket.accept()
                print('client addr: ', addr)
                self.update_server_state(States.LISTEN)
            elif self.server_state == States.LISTEN:
                print('wait data...')
                self.update_server_state(States.SYN_RECEIVED)
                continue
            elif self.server_state == States.SYN_RECEIVED:
                body, addr = self.recv_msg()
                if self._header.syn == 1:
                    seq_number = utils.rand_int()
                    self._header.seq_num = seq_number
                    body = str.encode(body.upper())
                    self._header.message = body
                    if self._header.seq_num > self.seq_count:
                        print("Good sequence")
                        self.seq_count = self._header.seq_num
                        udp_socket.sendto(body, addr)
                    else:
                        raise "Exception!!!"
                    self.update_server_state(States.SYN_SENT)
            elif self.server_state == States.SYN_SENT:
                self._header.bits(True)
                self.update_server_state(States.LISTEN)
            else:
                question = input('Do you want to quit? y\\n: ')
                if question == 'y':
                    break


if __name__ == '__main__':
    server = Server()
    server.run()


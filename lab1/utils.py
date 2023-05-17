from enum import Enum
import random

DEBUG = True

l = 0


class States(Enum):
    CLOSED, LISTEN, SYN_RECEIVED, SYN_SENT = range(1, 5)


class Header:
    def __init__(self, seq_num, ack_num, syn, ack, message):
        self.seq_num = seq_num
        self.ack_num = ack_num
        self.syn = syn
        self.ack = ack
        self.message = message

    def __str__(self):
        return self.pretty_bits_print(self.bits(True))

    def bits(self, no_print):
        bits = '{0:032b}'.format(self.seq_num)
        bits += '{0:032b}'.format(self.ack_num)
        bits += '{0:01b}'.format(self.syn)
        bits += '{0:01b}'.format(self.ack)
        bits += '{}'.format(self.message)
        if (DEBUG) and no_print:
            print(self.pretty_bits_print(bits))
        return bits.encode('utf-8')

    @staticmethod
    def pretty_bits_print(bits):
        seq_num = bits[:32]
        ack_num = bits[32:65]
        row_3 = bits[64:66]
        message = bits[66:]
        output = [seq_num + " : seq_num = {0}".format(int(seq_num, 2)),
                  ack_num + " : ack_num = {0}".format(int(ack_num, 2)),
                  row_3 + " : syn = {0}".format(row_3[0]), "message : {}".format(message)]
        return '\n'.join(output)


def bits_to_header(bits):
    bits = bits.decode()
    seq_num = int(bits[:32], 2)
    ack_num = int(bits[32:64], 2)
    syn = int(bits[64], 2)
    ack = int(bits[65], 2)
    message = str(bits[66:])
    return Header(seq_num, ack_num, syn, ack, message)


def get_body_from_data(data):
    data = data.decode()
    return data[66:]


def rand_int():
    global l
    l += 1
    return l


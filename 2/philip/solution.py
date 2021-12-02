import sys

def Part_1():
  filename = sys.argv[-1]
  with open(filename) as f: lines = [str(i.strip()) for i in f.readlines()]

  x = 0
  y = 0
  for l in lines:
    cmd = l.split(" ")
    if cmd[0] == "forward":
      x += int(cmd[1])
    elif cmd[0] == "up":
      y -= int(cmd[1])
    elif cmd[0] == "down":
      y += int(cmd[1])
    
  return x * y


def Part_2():
  filename = sys.argv[-1]
  with open(filename) as f: lines = [str(i.strip()) for i in f.readlines()]

  aim = 0
  x = 0
  y = 0
  for l in lines:
    cmd = l.split(" ")
    if cmd[0] == "forward":
      x += int(cmd[1])
      y += aim * int(cmd[1])
    elif cmd[0] == "up":
      aim -= int(cmd[1])
    elif cmd[0] == "down":
      aim += int(cmd[1])
    
  return x * y


def solve():
  part_1 = Part_1()
  part_2 = Part_2()
  print("P1: " + str(part_1))
  print("P2: " + str(part_2))




solve()

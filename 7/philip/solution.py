import sys
import math

def Solution():
  print("Part 1: " + str(Part_1()))
  print("Part 2: " + str(Part_2()))


def Part_2():
  filename = sys.argv[-1]
  with open(filename) as f: arr = [int(i) for i in f.readline().split(",")]

  #Avereage is not a good solution ceil works for sample and floor for input
  avg = math.floor(sum(arr)/len(arr))
  fuel = 0
  for i in arr:
    fuel += Fuel_Cost(i, avg)
  return fuel


def Fuel_Cost(start, end):
  delta = abs(start - end)
  return delta * (delta + 1) // 2


def Part_1():
  filename = sys.argv[-1]
  with open(filename) as f: arr = [int(i) for i in f.readline().split(",")]

  orderd_list = sorted(arr)
  target = orderd_list[len(arr)//2]
  
  fuel = 0
  for pos in orderd_list:
    fuel += abs(pos - target)
  
  return fuel

Solution()
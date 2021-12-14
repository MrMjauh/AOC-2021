import sys
import math

def Solution():
  print("Part 1: " + str(Part_1()))
  print("Part 2: " + str(Part_2()))


def Part_2():
  filename = sys.argv[-1]
  with open(filename) as f: arr = [int(i) for i in f.readline().split(",")]

  avg_floor = math.floor(sum(arr)/len(arr))
  avg_ceil = math.ceil(sum(arr)/len(arr))
  avgs = [avg_floor, avg_ceil]
  fuel_costs = [0, 0]
  for i in range(len(avgs)):
    fuel = 0
    for j in arr:
      fuel += Fuel_Cost(j, avgs[i])
    fuel_costs[i] = fuel
  return min(fuel_costs)


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
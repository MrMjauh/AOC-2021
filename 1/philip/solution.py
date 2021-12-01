import sys

def Day1_1():
  filename = sys.argv[-1]
  with open(filename) as f: lines = [int(i.strip()) for i in f.readlines()]

  prev = 0
  curr = 0
  incr = 0
  for l in lines:
    curr = l
    if prev != 0:
      if curr > prev:
        incr += 1
    prev = l
  
  print(incr)



def Get_Sum(slider):
  slider_sum = 0
  for x in slider:
    slider_sum += x
  
  return slider_sum


def Part_2():
  filename = sys.argv[-1]
  with open(filename) as f: lines = [int(i.strip()) for i in f.readlines()]
  
  prev = []
  curr = []
  total_incr = 0
  for l in range(len(lines)):
    if (l >= 2) & l <= (len(lines) - 2):
      curr = [lines[l - 2],lines[l-1], lines[l]]
      if len(prev) == 3:
        if Get_Sum(curr) > Get_Sum(prev):
          total_incr += 1
      prev = curr.copy()

  print(total_incr)
  

Part_2()
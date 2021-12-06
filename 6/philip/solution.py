import sys

def Fish_Ancestry(days):
  filename = sys.argv[-1]
  with open(filename) as f: arr = [int(i) for i in f.readline().split(",")]

  inp = arr
  count = [0]*9
  for fish in arr:
    count[fish] += 1

  for i in range(days):
    new_fish = 0
    reset_cycle = 0
    
    for j in range(0, 9):
      if j == 0:
        new_fish += count[j]
        reset_cycle += count[j]
      else:
        count[j - 1] += count[j]
      count[j] = 0
    count[6] += reset_cycle
    count[8] += new_fish
  return sum(count)


def Solution():
  print("Part 1: " + str(Fish_Ancestry(80)))
  print("Part 2: " + str(Fish_Ancestry(256)))


Solution()


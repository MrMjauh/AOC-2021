import sys

def Solution():
  filename = sys.argv[-1]
  with open(filename) as f: lines = [str(i.strip()) for i in f.readlines()]

  print("Part 1: " + str(Part_1(lines)))
  
  ogr = Get_Filtered_Rating(lines, 0, False)
  co2 = Get_Filtered_Rating(lines, 0, True)

  life_support_rating = int(ogr, 2) * int(co2, 2)
  print("Part 2: " + str(life_support_rating))


def Part_1(bitarray):
  bits = [0] * len(bitarray[0])
  mcb = ""
  lcb = ""
  for bit in bitarray:
    for i in range(len(bit)):
      if int(bit[i]) == 0:
        bits[i] -= 1
      else:
        bits[i] += 1
  
  for x in range(len(bits)):
    if int(bits[x]) > 0:
      mcb += "1"
      lcb += "0"
    else:
      mcb += "0"
      lcb += "1"
  
  return int(mcb, 2) * int(lcb, 2)


def Get_MCB(bits, pos):
  mcb = 0
  for bit in bits:
    for i in range(len(bit)):
      if int(bit[pos]) == 0:
        mcb -= 1
      else:
        mcb += 1

  if mcb >= 0:
    return 1
  return 0


def Get_Filtered_Rating(bits, pos, isC02):
  filtered = []
  mcb = Get_MCB(bits, pos)
  
  for bit in bits:
    if isC02 == True:
      if int(bit[pos]) != mcb:
        filtered.append(bit)
    else:
      if int(bit[pos]) == mcb:
        filtered.append(bit)
  if len(filtered) == 1:
    return filtered[0]
  return Get_Filtered_Rating(filtered, pos + 1, isC02)
  

Solution()
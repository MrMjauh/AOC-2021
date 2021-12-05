import sys

def Solution():
  filename = sys.argv[-1]
  with open(filename) as f: lines = [str(i.strip()) for i in f.readlines()]

  start_pos = []
  end_pos = []
  size = 1000
  board = [[0]*size for i in range(size)]

  for l in lines:
    s = l.split(" -> ")
    start_pos.append(list(map(int, s[0].split(","))))
    end_pos.append(list(map(int, s[1].split(","))))
  
  intersects = 0
  
  for i in range(len(start_pos)):
    Color_Line(start_pos[i], end_pos[i], board, False)
  intersects = Get_Intersects(board)
  print("Part 1: " + str(intersects))

  intersects = 0
  b2 = [[0]*size for i in range(size)]
  for i in range(len(start_pos)):
    Color_Line(start_pos[i], end_pos[i], b2, True)
  intersects = Get_Intersects(b2)
  print("Part 2: " + str(intersects))


def Get_Intersects(board):
  intersects = 0
  for y in range(len(board)):
    for x in range(len(board[0])):
      if board[y][x] >= 2:
        intersects += 1
  return intersects


def Color_Line(start_pos, end_pos, board, part2):
  x1 = start_pos[0]
  y1 = start_pos[1]

  x2 = end_pos[0]
  y2 = end_pos[1]
 
  if y1 == y2:
    if x1 > x2:
      tmp = x2
      x2 = x1
      x1 = tmp
    for x in range(x1, x2 + 1):
      board[y1][x] += 1  
  elif x1 == x2:
    if y1 > y2:
      tmp = y2
      y2 = y1
      y1 = tmp
    for y in range(y1, y2 + 1):
      board[y][x1] += 1
  elif part2: 
    Color_Diagonal(board, x1, y1, x2, y2)


def Color_Diagonal(board, x1, y1, x2, y2):
  board[y1][x1] += 1
  dx = x1
  dy = y1
  while dx != x2:
    dx = dx + 1 if dx < x2 else dx - 1
    dy = dy + 1 if dy < y2 else dy - 1
    board[dy][dx] += 1
 

Solution()
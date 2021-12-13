import sys

def Solution():
  filename = sys.argv[-1]
  with open(filename) as f: lines = [str(i.strip()) for i in f.readlines()]

  bingo_row = list(map(int, lines[0].split(",")))
  tmp_table = []
  tables = []
  ctr = 0
  for i in range(2, len(lines)):
    if lines[i] != "":
      int_arr = list(map(int, lines[i].split()))
      tmp_table.append(int_arr)
      ctr += 1
    if ctr == 5:
      ctr = 0
      tables.append(tmp_table)
      tmp_table = tmp_table.copy()
      tmp_table.clear()

  winner = Play_Bingo(tables.copy(), bingo_row)
  table_sum = Get_Sum(winner[0])
  print("Part 1: " + str(table_sum * winner[1]))


  tmp_tables = tables.copy()
  looser = Play_Loosing_Bingo(tmp_tables, bingo_row)
  loosing_sum = Get_Sum(looser[0])
  print("Part 2: " + str(loosing_sum * looser[1]))



def Has_Won(table):
  row_won = False
  cols = [0] * 5

  for y in range(len(table)):
    for x in range(len(table[y])):
      if table[y] == ["x"] * 5:
        row_won = True
      if table[y][x] == "x":
        cols[x] += 1
  
  return row_won or 5 in cols


def Get_Sum(table):
  table_sum = 0
  for row in table:
    for value in row:
      if type(value) == int:
        table_sum += value
  
  return table_sum


def Play_Table(table, number):
  for y in range(len(table)):
    for x in range(len(table[y])):
      if table[y][x] == number:
        table[y][x] = "x"


def Play_Loosing_Bingo(tables, numbers):
  for num in numbers:
    tmp_tables = tables.copy()
    for table in tmp_tables:
      Play_Table(table, num)
      if Has_Won(table):
        if len(tables) > 1:
          tables.remove(table)
        else:
          return (table, num)
    


def Play_Bingo(tables, numbers):
  for num in numbers:
    for table in tables:
      Play_Table(table, num)
      if Has_Won(table):
        return (table, num)


Solution()

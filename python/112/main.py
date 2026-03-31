from random import randint
class Die:
    def __init__(self, sides = 6):
        self.sides = sides

    def roll(self):
        return randint(1,self.sides)
rolls = []
die = Die()
for i in range(12):
    rolls.append(die.roll())
print(rolls)

die_two = Die()
points = 0
while True:
    if input("Press Enter to spin again type anything and enter to quit: "):
        break
    spin = die.roll() + die_two.roll()
    if spin == 2 or spin == 3:
        points-=1
        print(f"{spin}, You Lose")
    elif spin == 11 or spin == 12:
        points+=1
        print(f"{spin}, You Win")
    else:
        print(f"{spin}, Try Again")

    print(f"You have {points} points")
    print("*"*80)
    
    
from random import randint
import json


players = {'key':2}
try:
    with open('players.json','r') as f:
        players = json.load(f)
except FileNotFoundError:
    pass

def get_player():
    global high_score
    name = input("Enter your name: ")
    if name in players.keys():
        high_score = players[name]
       


def get_guess():
    while True:
        try:
            x = int(input("Guess a number 1-100: "))
            if 0 < x <= 100:
                return x
            else:
                print(RED+"Only Guess a number 1-100"+RESET)
        except ValueError:
            print(RED+"Only input a number"+RESET)
            

def game_loop():
    score = 0
    while True:
        score += 1
        x = get_guess()
        print(GRAY+"*"*25+RESET)
        if x == target:
            print(GREEN+'You win'+RESET)
            return score
        elif x > target:
            print(BLUE+"Too High!"+RESET)
        else:
            print(RED+"Too low"+RESET)

RESET = "\033[0m"
RED = "\033[31m"
GREEN = "\033[32m"
BLUE = "\033[34m"
GRAY = "50\x1b[38;5;243m"
        
high_score = 0
get_player()
print(high_score)
while True:
    target = randint(1,100)
    score = game_loop()
    print(f"You got a score of {score}")
    if score >= high_score:
        high_score = score
        print(GREEN+"New High Score!!!"+RESET)
    print(GRAY+"*"*25+RESET)
    if input("Press enter to play again type anything to quit: "):
        break
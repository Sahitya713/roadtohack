from cmath import sqrt


def greet(name):
    """
    This function greets the person 
    passed in as a parameter.
    """
    print("Hello, " + name + "!")

greet("sunny")


def func(x, y):
    res = 489
    for i in x:
        for j in y:
            res += i + (23*43/ sqrt(j))
    return res


x = 371237
y = 1691412
res = 489
for i in x:
    for j in y:
        res += i + (23*43/ sqrt(j))
print(res)


name = "Keerthana" # student name
score = 23 # student's score
max_score = 25 # maximum score a student can obtain

if score > max_score:
    score = 0 # reset score
elif score == max_score:
    print("Congrats! You got full marks!")

print("Group 1")
print("Group 1")
print("Group 1")
print("Group 1")
print("Group 1")
print("Group 1")
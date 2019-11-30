import os
print("Deploy to Heroku!")
os.system("git add .")
os.system("git commit -m \"Deploy to Heroku\"")
os.system("git subtree push --prefix 01_Source/02_Web heroku master")

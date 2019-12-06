import os

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


print (bcolors.OKGREEN + "Deploy to Heroku!" + bcolors.ENDC)

print (bcolors.OKBLUE + "Inital Pull" + bcolors.ENDC)
os.system("git pull")

print (bcolors.OKBLUE + "Build Frontend" + bcolors.ENDC)
# os.system("")
os.system("cd 01_Source/02_Web/Frontend && npm run build")
os.system("cd ..")
os.system("cd ..")
os.system("cd ..")

print (bcolors.OKBLUE + "Adding new files" + bcolors.ENDC)
os.system("git add .")

print (bcolors.OKBLUE + "Commiting files" + bcolors.ENDC)
os.system("git commit -m \"Deploy to Heroku\"")

print (bcolors.FAIL + "Pushing to Heroku!" + bcolors.ENDC)
os.system("git subtree push --prefix 01_Source/02_Web heroku")

print (bcolors.HEADER + "Done.." + bcolors.ENDC)

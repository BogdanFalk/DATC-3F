
import os

try:
    import checksumdir
except ImportError:
    print("Installing Checksumdir Module")
    os.system('python -m pip install checksumdir')

import checksumdir
from checksumdir import dirhash
import sys
import subprocess
import binascii

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

directory  = './01_Source/02_Web/Frontend'
md5hash    = dirhash(directory, 'md5',excluded_extensions=['.js','.ts','.md','.json'])

with open('pyhonReq.txt', 'w') as the_file:
    the_file.write(md5hash)

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
os.system("git subtree push --prefix 01_Source/02_Web heroku master")

print (bcolors.HEADER + "Done.." + bcolors.ENDC)



url = "https://voting-system-3f.herokuapp.com"
if sys.platform=='win32':
    os.startfile(url)
elif sys.platform=='darwin':
    subprocess.Popen(['open', url])
else:
    try:
        subprocess.Popen(['xdg-open', url])
    except OSError:
        print('Please open a browser on: ' + url)

@echo OFF
echo Deploy to Heroku
echo %CD%
git add .
git commit -m "Deploy for Heroku"
echo %CD%

git subtree push --prefix /01_Source/02/Web heroku master
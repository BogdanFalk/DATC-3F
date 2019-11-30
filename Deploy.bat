@echo OFF
echo Deploy to Heroku
echo %CD%
git add .
git commit -m "Deploy for Heroku"
echo %CD%

git push
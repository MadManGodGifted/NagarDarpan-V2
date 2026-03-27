@echo off
git rm -rf --cached node_modules
git add .
git commit --amend -m "Initial Deployment of NagarDarpan Platform without modules"
git push -u origin main -f
echo GitHub Push Complete.

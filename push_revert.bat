@echo off
git reset --hard HEAD~1
git push -u origin main -f
echo Successfully reverted and force pushed to GitHub.

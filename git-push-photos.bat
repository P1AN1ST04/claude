@echo off
cd /d "C:\Users\miche\Documents\Claude\Projects\moviflex"
git add -A
git commit -m "Add clinic photos to public/img"
git push origin main
echo.
echo DONE - Photos pushed to GitHub!
pause

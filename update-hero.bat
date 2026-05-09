@echo off
cd /d "C:\Users\miche\Documents\Claude\Projects\moviflex"
copy /Y "C:\Users\miche\Downloads\ChatGPT Image 9 may 2026, 04_43_54 p.m..png" "C:\Users\miche\Documents\Claude\Projects\moviflex\public\img\hero-fachada.jpg"
git add -A
git commit -m "Replace hero image with professional therapy photo"
git push origin main
del update-hero.bat
echo DONE!
pause

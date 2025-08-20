@echo off
chcp 65001 > nul
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    🏙️ Live Data City                        ║
echo ║              실시간 주식 3D 시각화 서버 시작                 ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 📊 백엔드 서버 시작 중... (포트 3001)
start "Live Data City Backend" cmd /k "cd /d backend && npm run dev"

timeout /t 3 /nobreak > nul

echo 🎨 프론트엔드 서버 시작 중... (포트 3000)
start "Live Data City Frontend" cmd /k "npm run dev"

timeout /t 2 /nobreak > nul

echo.
echo ✅ 서버 시작 완료!
echo.
echo 🌐 브라우저에서 다음 주소로 접속하세요:
echo    프론트엔드: http://localhost:3000
echo    백엔드 API: http://localhost:3001
echo.
echo 💡 서버를 중지하려면 stop-servers.bat을 실행하세요.
echo.
pause

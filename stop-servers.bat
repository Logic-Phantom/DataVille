@echo off
chcp 65001 > nul
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    🏙️ Live Data City                        ║
echo ║              실시간 주식 3D 시각화 서버 중지                 ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 🛑 서버 중지 중...

REM Node.js 프로세스 종료 (포트 3000, 3001 사용 중인 프로세스)
echo 📊 백엔드 서버 중지 중... (포트 3001)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001') do (
    taskkill /f /pid %%a > nul 2>&1
)

echo 🎨 프론트엔드 서버 중지 중... (포트 3000)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    taskkill /f /pid %%a > nul 2>&1
)

REM Live Data City 관련 cmd 창 종료
taskkill /f /fi "WINDOWTITLE:Live Data City*" > nul 2>&1

REM Node.js 프로세스 강제 종료 (추가 안전장치)
taskkill /f /im node.exe > nul 2>&1

timeout /t 2 /nobreak > nul

echo.
echo ✅ 모든 서버가 중지되었습니다!
echo.
echo 💡 서버를 다시 시작하려면 start-servers.bat을 실행하세요.
echo.
pause

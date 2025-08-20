# UTF-8 인코딩 설정
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    🏙️ Live Data City                        ║" -ForegroundColor Cyan
Write-Host "║              실시간 주식 3D 시각화 서버 시작                 ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "📊 백엔드 서버 시작 중... (포트 3001)" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host "🎨 프론트엔드 서버 시작 중... (포트 3000)" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "✅ 서버 시작 완료!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 브라우저에서 다음 주소로 접속하세요:" -ForegroundColor White
Write-Host "   프론트엔드: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   백엔드 API: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 서버를 중지하려면 stop-servers.ps1을 실행하세요." -ForegroundColor Gray
Write-Host ""
Read-Host "계속하려면 Enter를 누르세요"

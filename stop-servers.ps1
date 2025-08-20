# UTF-8 인코딩 설정
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    🏙️ Live Data City                        ║" -ForegroundColor Cyan
Write-Host "║              실시간 주식 3D 시각화 서버 중지                 ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "🛑 서버 중지 중..." -ForegroundColor Red

# 포트 3001 (백엔드) 사용 중인 프로세스 종료
Write-Host "📊 백엔드 서버 중지 중... (포트 3001)" -ForegroundColor Yellow
$backend = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
if ($backend) {
    $backendPid = $backend.OwningProcess
    Stop-Process -Id $backendPid -Force -ErrorAction SilentlyContinue
    Write-Host "   ✓ 백엔드 서버 중지됨 (PID: $backendPid)" -ForegroundColor Green
}

# 포트 3000 (프론트엔드) 사용 중인 프로세스 종료
Write-Host "🎨 프론트엔드 서버 중지 중... (포트 3000)" -ForegroundColor Yellow
$frontend = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($frontend) {
    $frontendPid = $frontend.OwningProcess
    Stop-Process -Id $frontendPid -Force -ErrorAction SilentlyContinue
    Write-Host "   ✓ 프론트엔드 서버 중지됨 (PID: $frontendPid)" -ForegroundColor Green
}

# Node.js 프로세스 추가 정리
Write-Host "🧹 Node.js 프로세스 정리 중..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $_.ProcessName -eq "node"
} | Stop-Process -Force -ErrorAction SilentlyContinue

# PowerShell 창 정리 (npm run dev 실행 중인 창들)
Get-Process -Name "powershell" -ErrorAction SilentlyContinue | Where-Object {
    $_.MainWindowTitle -like "*npm*" -or $_.MainWindowTitle -like "*dev*"
} | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "✅ 모든 서버가 중지되었습니다!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 서버를 다시 시작하려면 start-servers.ps1을 실행하세요." -ForegroundColor Gray
Write-Host ""
Read-Host "계속하려면 Enter를 누르세요"

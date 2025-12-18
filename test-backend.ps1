# 测试 Railway 后端服务
# 使用方法: .\test-backend.ps1

$backendUrl = "https://globalbusinesswebwithbackend-production.up.railway.app"

Write-Host "`n🔍 测试后端服务..." -ForegroundColor Cyan
Write-Host "URL: $backendUrl`n" -ForegroundColor Yellow

# 1. 健康检查
Write-Host "1️⃣ 健康检查测试..." -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "$backendUrl/api/health" -Method Get
    Write-Host "✅ 服务正常运行!" -ForegroundColor Green
    Write-Host "响应: " -NoNewline
    $response | ConvertTo-Json
    Write-Host ""
} catch {
    Write-Host "❌ 健康检查失败: $_" -ForegroundColor Red
    exit 1
}

# 2. 测试联系表单
Write-Host "2️⃣ 测试联系表单..." -ForegroundColor Green
try {
    $body = @{
        name = "测试用户"
        email = "test@example.com"
        phone = "1234567890"
        message = "这是一条测试消息 - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$backendUrl/api/contact" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body
    
    Write-Host "✅ 联系表单测试成功!" -ForegroundColor Green
    Write-Host "响应: " -NoNewline
    $response | ConvertTo-Json
    Write-Host ""
} catch {
    Write-Host "❌ 联系表单测试失败: $_" -ForegroundColor Red
    Write-Host "错误详情: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n✨ 测试完成!`n" -ForegroundColor Cyan













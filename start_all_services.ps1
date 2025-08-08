# 启动所有服务的PowerShell脚本

# 启动后端服务
Write-Host "启动后端服务..."
Start-Process powershell -ArgumentList "-Command cd backend; npm run dev"
Start-Sleep -Seconds 3

# 启动AI服务
Write-Host "启动AI服务..."
Start-Process powershell -ArgumentList "-Command cd ai-service; npm run dev"
Start-Sleep -Seconds 3

# 启动前端服务
Write-Host "启动前端服务..."
Start-Process powershell -ArgumentList "-Command cd frontend; npm start"

Write-Host "所有服务已启动！"
Write-Host "前端应用: http://localhost:3000"
Write-Host "后端API: http://localhost:3001"
Write-Host "AI服务API: http://localhost:3002"
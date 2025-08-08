// 验证开发环境是否正确搭建的脚本
const http = require('http');

// 验证函数
function verifyService(name, port, path = '/', timeout = 3000) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: port,
      path: path,
      method: 'GET',
      timeout: timeout
    };

    const req = http.request(options, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve(`${name} 服务正常运行在 http://localhost:${port}${path}`);
      } else {
        reject(`${name} 服务返回错误状态码: ${res.statusCode}`);
      }
    });

    req.on('error', (e) => {
      reject(`${name} 服务无法访问: ${e.message}`);
    });

    req.on('timeout', () => {
      req.abort();
      reject(`${name} 服务超时`);
    });

    req.end();
  });
}

// 执行验证
async function runVerification() {
  console.log('开始验证开发环境...\n');

  try {
    // 验证后端服务
    const backendResult = await verifyService('后端', 3001);
    console.log('✅', backendResult);

    // 验证AI服务
    const aiServiceResult = await verifyService('AI', 3002);
    console.log('✅', aiServiceResult);

    // 验证前端服务
    const frontendResult = await verifyService('前端', 3000);
    console.log('✅', frontendResult);

    console.log('\n开发环境验证成功！');
  } catch (error) {
    console.error('❌', error);
    console.error('\n开发环境验证失败，请检查相关服务是否正常启动。');
  }
}

// 运行验证
runVerification();
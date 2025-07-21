/**
 * TechFlow Solutions - Windows App Service Server
 * Company: TechFlow Solutions
 * Contact: ra4347534@gmail.com
 * B2C Tenant: ra4347534gmail.onmicrosoft.com
 * Platform: Windows App Service with IIS and Node.js
 * 
 * This server.js file is optimized for Windows hosting with IIS integration
 * and provides the entry point for TechFlow's Azure MFA Next.js application.
 */

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

// TechFlow environment configuration
const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.WEBSITE_HOSTNAME || 'localhost'
const port = process.env.PORT || process.env.WEBSITES_PORT || 3000

// Initialize Next.js app with TechFlow configuration
const app = next({ 
  dev, 
  hostname, 
  port,
  conf: {
    // Windows-specific Next.js configuration for TechFlow
    distDir: '.next',
    generateEtags: false,
    compress: false, // Let IIS handle compression
    poweredByHeader: false,
    // TechFlow custom configuration
    env: {
      TECHFLOW_COMPANY: 'TechFlow Solutions',
      TECHFLOW_CONTACT: 'ra4347534@gmail.com',
      TECHFLOW_PLATFORM: 'Windows App Service'
    }
  }
})

const handle = app.getRequestHandler()

// TechFlow startup logging
console.log('🚀 TechFlow Solutions - Starting Windows App Service...')
console.log('📧 Contact: ra4347534@gmail.com')
console.log('🔗 B2C Tenant: ra4347534gmail.onmicrosoft.com')
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
console.log(`🖥️  Platform: Windows App Service`)
console.log(`📡 Port: ${port}`)
console.log(`🌐 Hostname: ${hostname}`)

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Add TechFlow-specific headers
      res.setHeader('X-Powered-By', 'TechFlow Solutions - Windows App Service')
      res.setHeader('X-TechFlow-Company', 'TechFlow Solutions')
      res.setHeader('X-TechFlow-Contact', 'ra4347534@gmail.com')
      
      // Parse the URL
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      // TechFlow health check endpoint
      if (pathname === '/api/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          status: 'healthy',
          timestamp: new Date().toISOString(),
          company: 'TechFlow Solutions',
          contact: 'ra4347534@gmail.com',
          b2c_tenant: 'ra4347534gmail.onmicrosoft.com',
          platform: 'Windows App Service',
          environment: process.env.NODE_ENV || 'development',
          version: process.env.npm_package_version || '1.0.0',
          hostname: hostname,
          port: port,
          uptime: process.uptime(),
          memory_usage: process.memoryUsage(),
          azure_region: process.env.REGION_NAME || 'Unknown',
          app_service_name: process.env.WEBSITE_SITE_NAME || 'Local'
        }))
        return
      }

      // TechFlow company info endpoint
      if (pathname === '/api/company') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          company: 'TechFlow Solutions',
          contact: 'ra4347534@gmail.com',
          b2c_tenant: 'ra4347534gmail.onmicrosoft.com',
          platform: 'Windows App Service',
          services: [
            'Azure MFA Implementation',
            'Windows App Service Hosting',
            'Azure AD B2C Integration',
            'Multi-Environment Deployment'
          ],
          environments: ['Development', 'Test', 'Production']
        }))
        return
      }

      // Handle Windows-specific static file paths
      if (pathname.startsWith('/_next/static/')) {
        // Static files - let Next.js handle them with proper caching
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        await handle(req, res, parsedUrl)
        return
      }

      // Handle TechFlow API routes
      if (pathname.startsWith('/api/')) {
        // Log API requests in development
        if (dev) {
          console.log(`🔍 TechFlow API Request: ${req.method} ${pathname}`)
        }
        await handle(req, res, parsedUrl)
        return
      }

      // Handle authentication routes
      if (pathname.startsWith('/auth/')) {
        // Log auth requests in development
        if (dev) {
          console.log(`🔐 TechFlow Auth Request: ${req.method} ${pathname}`)
        }
        await handle(req, res, parsedUrl)
        return
      }

      // Handle all other TechFlow requests
      await handle(req, res, parsedUrl)
      
    } catch (err) {
      console.error('❌ TechFlow Server Error:', {
        url: req.url,
        method: req.method,
        error: err.message,
        stack: dev ? err.stack : undefined,
        timestamp: new Date().toISOString()
      })
      
      // Send TechFlow error response
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/html')
      res.end(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>TechFlow Solutions - Server Error</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
              .container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { color: #d73527; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
              .company { color: #666; font-size: 14px; margin-top: 20px; }
              .error-details { background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 class="header">TechFlow Solutions - Server Error</h1>
              <p>An error occurred while processing your request on our Windows App Service.</p>
              <div class="error-details">
                <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
                <p><strong>Platform:</strong> Windows App Service</p>
                ${dev ? `<p><strong>Error:</strong> ${err.message}</p>` : ''}
              </div>
              <div class="company">
                <p><strong>TechFlow Solutions</strong></p>
                <p>Contact: ra4347534@gmail.com</p>
                <p>B2C Tenant: ra4347534gmail.onmicrosoft.com</p>
              </div>
            </div>
          </body>
        </html>
      `)
    }
  })
  .once('error', (err) => {
    console.error('❌ TechFlow Server startup error:', err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`✅ TechFlow Solutions server ready!`)
    console.log(`🌐 URL: http://${hostname}:${port}`)
    console.log(`🏢 Company: TechFlow Solutions`)
    console.log(`📧 Contact: ra4347534@gmail.com`)
    console.log(`🔧 Platform: Windows App Service with IIS`)
    
    // Log environment variables for TechFlow debugging (development only)
    if (dev) {
      console.log('\n🔍 TechFlow Environment Configuration:')
      console.log(`  - AZURE_AD_B2C_TENANT_NAME: ${process.env.AZURE_AD_B2C_TENANT_NAME || 'not set'}`)
      console.log(`  - AZURE_AD_B2C_CLIENT_ID: ${process.env.AZURE_AD_B2C_CLIENT_ID ? '***configured***' : 'not set'}`)
      console.log(`  - NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || 'not set'}`)
      console.log(`  - NODE_ENV: ${process.env.NODE_ENV || 'development'}`)
      console.log(`  - WEBSITE_SITE_NAME: ${process.env.WEBSITE_SITE_NAME || 'local'}`)
    }
  })
})
.catch((ex) => {
  console.error('❌ TechFlow Next.js app preparation failed:', ex)
  process.exit(1)
})

// TechFlow graceful shutdown handling for Windows
process.on('SIGTERM', () => {
  console.log('🛑 TechFlow: SIGTERM received, shutting down gracefully...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('🛑 TechFlow: SIGINT received, shutting down gracefully...')
  process.exit(0)
})

// Windows-specific process handling for TechFlow
process.on('message', (msg) => {
  if (msg === 'shutdown') {
    console.log('🛑 TechFlow: Shutdown message received, closing server...')
    process.exit(0)
  }
})

// TechFlow error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ TechFlow Unhandled Rejection:', {
    reason: reason,
    promise: promise,
    timestamp: new Date().toISOString()
  })
  // Don't exit the process in production for TechFlow stability
  if (dev) {
    process.exit(1)
  }
})

process.on('uncaughtException', (err) => {
  console.error('❌ TechFlow Uncaught Exception:', {
    error: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  })
  if (dev) {
    process.exit(1)
  }
})
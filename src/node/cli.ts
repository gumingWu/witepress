import minimist from 'minimist'
import { createLogger } from 'vite'
import { version } from '../../package.json'
import { createServer } from './server'

const argv: any = minimist(process.argv.slice(2))

const logVersion = (logger = createLogger()) => {
  logger.info(`\n v${version}\n`, {
    clear: !logger.hasWarned,
  })
}

const command = argv._[0]
const root = argv._[command ? 1 : 0]

if (root)
  argv.root = root

if (!command || command === 'dev') {
  const createDevServer = async () => {
    const server = await createServer(root, argv)
    await server.listen()
    logVersion(server.config.logger)
    server.printUrls()
  }
  createDevServer().catch((err) => {
    createLogger().error(`failed to start server. error: \n${err.stack}`)
  })
} else {
  logVersion()
  createLogger().error(`unknown command ${command}`)
  process.exit(1)
}

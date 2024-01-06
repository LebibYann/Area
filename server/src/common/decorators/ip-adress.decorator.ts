import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import * as requestIp from 'request-ip'

/**
 * IpAdress
 * Extract the client IP.
 */
export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: requestIp.Request = ctx.switchToHttp().getRequest()
    return requestIp.getClientIp(request) // Extract the client IP
  }
)

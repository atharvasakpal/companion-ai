import {Ratelimit} from '@upstash/ratelimit'
import {Redis} from '@upstash/redis'


export async function rateLimit(identifier:string){
    const rateLimit  = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(50, '60s'),
        analytics: true,
        prefix: '@upstash/ratelimit',
    })

    const result = await rateLimit.limit(identifier);

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}
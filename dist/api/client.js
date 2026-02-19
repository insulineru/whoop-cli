import { getValidTokens } from '../auth/tokens.js';
import { BASE_URL, ENDPOINTS } from './endpoints.js';
import { WhoopError, ExitCode } from '../utils/errors.js';
import { getDateRange, nowISO } from '../utils/date.js';
async function request(endpoint, params) {
    const tokens = await getValidTokens();
    const url = new URL(BASE_URL + endpoint);
    if (params?.start)
        url.searchParams.set('start', params.start);
    if (params?.end)
        url.searchParams.set('end', params.end);
    if (params?.limit)
        url.searchParams.set('limit', String(params.limit));
    if (params?.nextToken)
        url.searchParams.set('nextToken', params.nextToken);
    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new WhoopError('Authentication failed', ExitCode.AUTH_ERROR, 401);
        }
        if (response.status === 429) {
            throw new WhoopError('Rate limit exceeded', ExitCode.RATE_LIMIT, 429);
        }
        throw new WhoopError(`API request failed`, ExitCode.GENERAL_ERROR, response.status);
    }
    return response.json();
}
async function fetchAll(endpoint, params, fetchAllPages) {
    const results = [];
    let nextToken;
    do {
        const response = await request(endpoint, { ...params, nextToken });
        results.push(...response.records);
        nextToken = fetchAllPages ? response.next_token : undefined;
    } while (nextToken);
    return results;
}
export async function getProfile() {
    return request(ENDPOINTS.profile);
}
export async function getBody() {
    return request(ENDPOINTS.body);
}
export async function getSleep(params = {}, all = false) {
    return fetchAll(ENDPOINTS.sleep, { limit: 25, ...params }, all);
}
export async function getRecovery(params = {}, all = false) {
    return fetchAll(ENDPOINTS.recovery, { limit: 25, ...params }, all);
}
export async function getWorkout(params = {}, all = false) {
    return fetchAll(ENDPOINTS.workout, { limit: 25, ...params }, all);
}
export async function getCycle(params = {}, all = false) {
    return fetchAll(ENDPOINTS.cycle, { limit: 25, ...params }, all);
}
export async function fetchData(types, date, options = {}) {
    const { start, end } = options.start && options.end
        ? { start: options.start, end: options.end }
        : getDateRange(date);
    const params = { start, end, limit: options.limit };
    const output = {
        date,
        fetched_at: nowISO(),
    };
    const fetchers = {
        profile: async () => {
            output.profile = await getProfile();
        },
        body: async () => {
            output.body = await getBody();
        },
        sleep: async () => {
            output.sleep = await getSleep(params, options.all);
        },
        recovery: async () => {
            output.recovery = await getRecovery(params, options.all);
        },
        workout: async () => {
            output.workout = await getWorkout(params, options.all);
        },
        cycle: async () => {
            output.cycle = await getCycle(params, options.all);
        },
    };
    await Promise.all(types.map((type) => fetchers[type]()));
    return output;
}
export async function fetchAllTypes(date, options = {}) {
    return fetchData(['profile', 'body', 'sleep', 'recovery', 'workout', 'cycle'], date, options);
}
//# sourceMappingURL=client.js.map
import 'server-only';
import { Redis } from '@upstash/redis';

export const redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface SessionProp {
    id: string;
    refreshToken: string;
    accessToken: string;
    userId: string;
}

export const saveSessionOnRedis = async (session: SessionProp) => {
    try {
        // Store session data as a hash
        await redisClient.hset(session.id, {
            refreshToken: session.refreshToken,
            accessToken: session.accessToken,
            userId: session.userId,
        });

        // Set expiration for the session ID key (7 days in seconds)
        await redisClient.expire(session.id, 7 * 24 * 60 * 60);

    } catch (error) {
        console.error('Error saving session on Redis:', error);
    }
};

// Function to get session from Redis
export const getSession = async (sessionId: string): Promise<SessionProp | null> => {
    try {
        const sessionData = await redisClient.hgetall(sessionId);

        if (!sessionData || Object.keys(sessionData).length === 0) {
            return null; // Session not found
        }

        // Type assertion to ensure correct types
        return {
            id: sessionId,
            refreshToken: sessionData.refreshToken as string,
            accessToken: sessionData.accessToken as string,
            userId: sessionData.userId as string,
        };
    } catch (error) {
        console.error('Error retrieving session from Redis:', error);
        return null;
    }
};

// Function to revoke session (delete session) from Redis
export const revokeSession = async (sessionId: string): Promise<boolean> => {
    try {
        const result = await redisClient.del(sessionId);
        return result > 0; // Returns true if the session was deleted, false otherwise
    } catch (error) {
        console.error('Error revoking session from Redis:', error);
        return false;
    }
};

export const saveResetToken = async (resetToken: string, userId: string) => {
    try {
        // Store reset token with userId
        await redisClient.set(resetToken, userId);

        // Set expiration for the reset token (1 hour in seconds)
        await redisClient.expire(resetToken, 60 * 60);

        console.log(`Reset token stored for user: ${userId}`);
    } catch (error) {
        console.error('Error saving reset token on Redis:', error);
        throw new Error('Failed to store reset token');
    }
};


export const getUserIdByResetToken = async (resetToken: string): Promise<string | null> => {
    try {
        const userId = await redisClient.get(resetToken);

        if (!userId) {
            return null; // Token not found or expired
        }

        return userId.toString();
    } catch (error) {
        console.error('Error retrieving reset token from Redis:', error);
        return null;
    }
};

export const revokeResetToken = async (resetToken: string): Promise<boolean> => {
    try {
        const result = await redisClient.del(resetToken);
        return result > 0; // Returns true if the token was deleted, false otherwise
    } catch (error) {
        console.error('Error revoking reset token from Redis:', error);
        return false;
    }
};


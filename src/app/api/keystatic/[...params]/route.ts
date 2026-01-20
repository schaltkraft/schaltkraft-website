import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from "../../../../keystatic.config";
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Check if required env vars are present for GitHub mode
const hasGitHubCredentials =
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
    process.env.KEYSTATIC_SECRET;

// Only initialize route handler if we have credentials or in local mode
const handler = config.storage.kind === 'local' || hasGitHubCredentials
    ? makeRouteHandler({ config })
    : null;

// Fallback handlers that don't crash during build
const fallbackHandler = async (request: NextRequest) => {
    return NextResponse.json(
        {
            error: 'Keystatic not configured',
            message: 'Please set KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, and KEYSTATIC_SECRET environment variables.',
            setupUrl: '/keystatic'
        },
        { status: 503 }
    );
};

export const GET = handler?.GET ?? fallbackHandler;
export const POST = handler?.POST ?? fallbackHandler;

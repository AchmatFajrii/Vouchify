import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import bcrypt from 'bcrypt';

const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const google = require('googleapis').google;

const { generateTokens } = require("../utils/jwt/token.jwt");
const { hashToken } = require("../utils/jwt/hash-token.jwt");
const {
    OAuth2Client,
} = require('google-auth-library');

const authService = new AuthService();

class AuthController {
    async signGoogle(req: any, res: Response) {
        const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        
        const oAuth2Client = new OAuth2Client(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            "postmessage"
        );

        const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for token
        
        var oauth2Client = new OAuth2Client();
        oauth2Client.setCredentials({access_token: tokens.access_token});
        var oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        const { data } = await oauth2.userinfo.get();

        const oAuthId = data.id;
        const email = data.email;
        
        const jti = uuidv4();
        const existingUser = await authService.findUserByEmail(email);
        
        // If user existing - login method
        if (existingUser) {
            const { accessToken, refreshToken } = generateTokens(existingUser, jti);

            return res.json({
                accessToken,
                refreshToken,
            });
        }
        
        const name = req.user.displayName;
        const user = await authService.createUserByEmail({ email, name });
        const oAuthProvider = await authService.findOAuthProviderByName('google');
        const userId = user.id;
        const oAuthProviderId = oAuthProvider?.id;

        authService.createOAuthUser({ userId, oAuthProviderId, oAuthId });
        
        const { accessToken, refreshToken } = generateTokens(user, jti);
        
        return res.json({
            accessToken,
            refreshToken,
        });
    }
    async authByGoogle(req: any, res: Response) {
        const oAuthId = req.user['id'];
        const email = req.user['emails'][0]['value'];
        
        const jti = uuidv4();
        const existingUser = await authService.findUserByEmail(email);
        
        // If user existing - login method
        if (existingUser) {
            const { accessToken, refreshToken } = generateTokens(existingUser, jti);

            return res.json({
                accessToken,
                refreshToken,
            });
        }
        
        const name = req.user.displayName;
        const user = await authService.createUserByEmail({ email, name });
        const oAuthProvider = await authService.findOAuthProviderByName('google');
        const userId = user.id;
        const oAuthProviderId = oAuthProvider?.id;

        authService.createOAuthUser({ userId, oAuthProviderId, oAuthId });
        
        const { accessToken, refreshToken } = generateTokens(user, jti);
        
        return res.json({
            accessToken,
            refreshToken,
        });
    }

    async create(req: Request, res: Response) {
        const { name, gender, phoneNumber, email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error('You must provide an email and a password.');
        }

        const existingUser = await authService.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                "meta": {
                    "message": "User already exists"
                },
                "data": null
            })
        }

        const user = await authService.createUserByEmailAndPassword({ name, gender, phoneNumber, email, password });
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        await authService.addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

        return res.json({
            accessToken,
            refreshToken,
        });
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    "meta": {

                    }
                });
            }

            const existingUser = await authService.findUserByEmail(email);
            if (!existingUser) {
                return res.status(400).json({
                    "meta": {

                    }
                });
            }

            const validPassword = await bcrypt.compare(password, existingUser.password || '');
            if (!validPassword) {
                return res.status(400).json({
                    "meta": {

                    }
                });
            }

            const jti = uuidv4();
            const { accessToken, refreshToken } = generateTokens(existingUser, jti);
            await authService.addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

            return res.json({
                accessToken,
                refreshToken
            });
        } catch (error) {
            return res.json({
                "accessToken": null,
                "refreshToken": null
            });
        }
    }

    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(400);
            throw new Error('Missing refresh token.');
        }

        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken = await authService.findRefreshTokenById(payload.jti);

        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const user = await authService.findUserById(payload.userId);
        if (!user) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        await authService.deleteRefreshToken(savedRefreshToken.id);
        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        await authService.addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

        res.json({
            accessToken,
            refreshToken: newRefreshToken
        });
    }
}

export default new AuthController();
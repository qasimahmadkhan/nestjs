import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from "src/user/user.service";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'SECRET_KEY',
        })
    }

    async validate(payload:any){
        const user = await this.userService.findByEmail(payload.email);
        if(!user){
            throw new Error('Unauthorized');
        }
        return user;
    }
}
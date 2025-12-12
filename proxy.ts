import { NextRequest } from "next/server";

export default function proxy(req:NextRequest){
    if(req.nextUrl.pathname === '/'){
        return Response.redirect(new URL('/dashboard',req.url));
    }
}
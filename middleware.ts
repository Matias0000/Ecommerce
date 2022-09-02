import {NextResponse } from 'next/server'
import {jwtVerify} from 'jose'   

export  async function middleware(request){
    // console.log(request.nextUrl.pathname);

    const jwt = request.cookies.get('myTokenName')
    // console.log(jwt);
    
    // if(request.nextUrl.pathname.includes('/home')){
        if(jwt === undefined){
            return NextResponse.redirect(new URL('/login', request.url))
        }

        try {
            const {payload}=  await jwtVerify(jwt, new TextEncoder().encode(process.env.JWTSECRET!))
            // console.log(payload);
            return NextResponse.next()
        } catch (error) {
            console.log(error);
            return NextResponse.redirect(new URL('/login', request.url) )   
        }
        
    }
//     return NextResponse.next()
// }

export const config = {
    matcher:['/','/prueba','/products/:path*','/carrito','/chat','/carrito']
}
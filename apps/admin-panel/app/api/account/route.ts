import { NextResponse } from 'next/server';
import { Client, Account } from 'node-appwrite';

export async function GET(request: Request) {
  try {
    const client = new Client();

    const account = new Account(client);

    client
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('645b9339c4b33f578efb') // Your project ID
      .setKey(
        '91fb5da5f69b313d4b0e7df859e5fbdf1678083eb6913ad05d19af7f74307a770bd1505284f9eed338edb825cf16548b100261147ab1e6560538e5f4fa1f3b10d9c658553c4f7c331c67ea9db00e529e36a49b61f52dd2961c70156fe5b9411cf8380b75c5d7c9297fce148dfdb53e0c9cb5fa30fc12ea0ecaa077ab8da76f86'
      )
      .setJWT(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiO…jE5fQ.PZNu6CTh-xe4VC8dtbwUPvv7TDChcP_E_UzHSxZt-lM'
      );

    const promise = await account.get();
    console.log(
      '------------- API GETTING ACCOUNT ----------------: ',
      promise
    );

    return NextResponse.json({ user: promise });
  } catch (e: any) {
    console.log(`Error getting account in API route: ${e.message}`);
    return NextResponse.json({
      message: `Error getting account in API route: ${e.message}`,
    });
  }
}

// export async function POST(request: Request) {}

export async function DELETE(request: Request) {}

import { Resend } from 'resend'
import { NextRequest } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
    try {
        const { name, email, message }: { name: string; email: string; message: string } =
            await request.json()

        if (!name || !email || !message) {
            return Response.json({ error: 'Tous les champs sont requis.' }, { status: 400 })
        }

        const { error } = await resend.emails.send({
            from: 'Contact Portfolio <onboarding@resend.dev>', 
            to: [process.env.EMAIL!],                          
            subject: `Nouveau message de ${name}`,
            replyTo: email,
            html: `
                <h2>Nouveau message de contact</h2>
                <p><strong>Nom :</strong> ${name}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Message :</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        })

        if (error) return Response.json({ error: error.message }, { status: 500 })

        return Response.json({ success: true }, { status: 200 })
    } catch {
        return Response.json({ error: 'Erreur serveur.' }, { status: 500 })
    }
}
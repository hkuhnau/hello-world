import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import {useRouter} from 'next/router';
export const revalidate = 0;

export const GET = async (request) => {
    const router = useRouter();
    try{
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        
        return new Response(JSON.stringify(prompts), {
            status: 200
        })

    } catch (error) {
        return new Response(JSON.stringify('Failed to fetch prompts'), {
            status:500
        })
    }
}
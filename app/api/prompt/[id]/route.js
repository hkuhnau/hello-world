import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
//GET (read the request)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not found"
        , {status: 404})

        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        return new Response(JSON.stringify('Failed to fetch prompt'), {
            status: 500
        })
    }
}
//PATCH (update)
export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!prompt) return new Response("Prompt not found"
            , { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return newResponse(JSON.stringify(existingPrompt), {status:200});
    } catch (error) {
        return new Response(JSON.stringify('Failed to update prompt'), {
            status: 500
        })
    }
}
//DELETE
export const DELETE = async (request, {params}) => {
    try{
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt Deleted successfully", {
            status:200
        });
    } catch (error) {
        return new Response(JSON.stringify('Failed to delete prompt'), {
            status: 500
        })
    }
}
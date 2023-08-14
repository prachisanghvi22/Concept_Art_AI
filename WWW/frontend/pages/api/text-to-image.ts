import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { addNewPrompt } from '../../utils/SupabaseAdmin';

export interface MyRouteResponse {
    status:         string;
    generationTime: number;
    id:             number;
    output:         string[];
    meta:           Meta;
}

export interface Meta {
    H:                        number;
    W:                        number;
    enable_attention_slicing: string;
    file_prefix:              string;
    guidance_scale:           number;
    model:                    string;
    n_samples:                number;
    negative_prompt:          string;
    outdir:                   string;
    prompt:                   string;
    revision:                 string;
    safety_checker:           string;
    seed:                     number;
    steps:                    number;
    vae:                      string;
}


type ErrorResponse = {
  message: string;
}

const SD_API_KEY = process.env.SD_API_KEY

export default async (req: NextApiRequest, res: NextApiResponse<MyRouteResponse | ErrorResponse>) => {
  try {
    const { prompt, nPrompt, initURL, userId } = req.body
    
    const response = await axios.post('https://stablediffusionapi.com/api/v3/img2img', 
    {
      "key": SD_API_KEY,
      "prompt": prompt,
      "negative_prompt": nPrompt,
      "init_image": initURL,
      "width": "512",
      "height": "512",
      "samples": "1",
      "num_inference_steps": "30",
      "guidance_scale": 7.5,
      "safety_checker":"yes",
      "strength": 0.7,
      "seed": null,
      "webhook": null,
      "track_id": null
       })

    const result: MyRouteResponse = response.data
    if(result.status === "success") {
      const { data, error} = await addNewPrompt({user_id: userId,prompt: prompt, image_url: result.output[0] })
    }

    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
